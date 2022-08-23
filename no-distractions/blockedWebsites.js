let blockedWebsites = [1, 2];

const fetchBlockedWebsites = async () => {
    return new Promise((resolve) => {
        resolve(chrome.storage.sync.get("blockedWebsites"));
    })
}

export const getBlockedWebsites = async () => {
    blockedWebsites = await fetchBlockedWebsites();
    return blockedWebsites;
}

export const addWebsiteToBlockedWebsites = async (websiteURL, time=null) => {
    blockedWebsites = await fetchBlockedWebsites();
    const website = {
        url: websiteURL,
        time: time
    };

    blockedWebsites[blockedWebsites.length] = website;
    console.log(blockedWebsites);
    chrome.storage.sync.set({ "blockedWebsites": JSON.stringify(blockedWebsites) });
}

export const removeWebsiteFromBlockedWebsites = async (websiteURL) => {
    blockedWebsites = await fetchBlockedWebsites();
    blockedWebsites = blockedWebsites.filter(web => web.url !== websiteURL);
    chrome.storage.sync.set({ "blockedWebsites": JSON.stringify(blockedWebsites) });
}