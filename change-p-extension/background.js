chrome.action.onClicked.addListener(gotClicked);

function gotClicked(tab) {
    chrome.tabs.sendMessage(tab.id, {
        msg: "y"
    })
}