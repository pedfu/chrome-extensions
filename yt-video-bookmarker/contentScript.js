(() => {
    let currentVideo = "";
    let ytPlayer;
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if(type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        } else if(type === "PLAY") {
            ytPlayer.currentTime = value;
        } else if(type === "DELETE") {
            currentVideoBookmarks = currentVideoBookmarks.filter(bookmark => bookmark.time != value);
            chrome.storage.sync.set({ [currentVideo]: JSON.stringify(currentVideoBookmarks) });

            response(currentVideoBookmarks);
        }
    })

    const fetchBookmarks = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get([currentVideo], (obj) => {
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
            })
        })
    }

    const newVideoLoaded = async () => {
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0];
        currentVideoBookmarks = await fetchBookmarks();

        if(!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img");
            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.title = "Click to bookmark";
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";

            const ytRightControls = document.getElementsByClassName("ytp-right-controls")[0];
            ytRightControls.prepend(bookmarkBtn);

            ytPlayer = document.getElementsByClassName("video-stream")[0];

            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
    }


    const addNewBookmarkEventHandler = async () => {
        const currentTime = ytPlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime)
        }

        currentVideoBookmarks = await fetchBookmarks();
        
        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        })

        console.log(currentVideoBookmarks);
    }   

    newVideoLoaded();
})();

const getTime = (seconds) => {
    const date = new Date(0);
    date.setSeconds(seconds);

    return date.toISOString().substring(11,19);
} 
