// import { getActiveTabURL } from "./utils.js";
import { addWebsiteToBlockedWebsites } from "./blockedWebsites.js"

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('form');
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = document.getElementById('input').value;
        const url = new URL(input);
        addWebsiteToBlockedWebsites(url.host);
    })
})

// // adding a new bookmark row to the popup
// const addNewBookmark = (bookmarksElement, bookmark) => {
//     const bookmarkTitleElement = document.createElement("div");
//     const controlsElement = document.createElement("div");
//     const newBookmarkElement = document.createElement("div");

//     controlsElement.className = "bookmark-controls";

//     bookmarkTitleElement.textContent = bookmark.desc;
//     bookmarkTitleElement.className = "bookmark-title";

//     setBookmarkAttributes("play", onPlay, controlsElement);
//     setBookmarkAttributes("delete", onDelete, controlsElement);

//     newBookmarkElement.setAttribute("timestamp", bookmark.time);
//     newBookmarkElement.className = "bookmark";
//     newBookmarkElement.id = "bookmark-" + bookmark.time;

//     newBookmarkElement.appendChild(bookmarkTitleElement);
//     newBookmarkElement.appendChild(controlsElement);
//     bookmarksElement.appendChild(newBookmarkElement);
// };

// const viewBookmarks = (currentBookmarks=[]) => {
//     const bookmarksElement = document.getElementById("bookmarks");
//     bookmarksElement.innerHTML = '';

//     if(currentBookmarks.length > 0) {
//         currentBookmarks.map(bookmark => addNewBookmark(bookmarksElement, bookmark))
//     } else {
//         bookmarksElement.innerHTML = '<li class="row">No bookmarks to show.</li>'
//     }
// };

// const onPlay = async e => {
//     const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
//     const activeTab = await getActiveTabURL();

//     chrome.tabs.sendMessage(activeTab.id, {
//         type: "PLAY",
//         value: bookmarkTime
//     })
// };

// const onDelete = async e => {
//     const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
//     const activeTab = await getActiveTabURL();
//     const bookmarkElementToDelete = document.getElementById("bookmark-" + bookmarkTime);

//     bookmarkElementToDelete.parentNode.removeChild(bookmarkElementToDelete);

//     chrome.tabs.sendMessage(activeTab.id, {
//         type: "DELETE",
//         value: bookmarkTime
//     });
// };

// const setBookmarkAttributes =  (src, eventListener, controlParentElement) => {
//     const controlElement = document.createElement("img");
//     controlElement.src = "assets/" + src + ".png";
//     controlElement.title = src;
//     controlElement.addEventListener("click", eventListener);

//     controlParentElement.appendChild(controlElement);
// };


// document.addEventListener("DOMContentLoaded", async () => {
//     const activeTab = await getActiveTabURL();
//     const queryParameters = activeTab.url.split("?")[1];
//     const urlParameters = new URLSearchParams(queryParameters);
  
//     const currentVideo = urlParameters.get("v");

//     console.log('object');
  
//     if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
//       chrome.storage.sync.get([currentVideo], (data) => {
//         const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];
  
//         viewBookmarks(currentVideoBookmarks);
//       });
//     } else {
//       const container = document.getElementsByClassName("container")[0];  
//       container.innerHTML = '<div class="title">This is not a youtube video page.</div>';
//     }
//   });