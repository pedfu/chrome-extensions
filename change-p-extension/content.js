chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(obj, sender, response) {
    const { txt } = obj;

    const allP = document.getElementsByTagName("p");
    for(p of allP) {
        p.innerText = txt;
    }
}