let word = '';

window.addEventListener("mouseup", selectWord);

function selectWord() {
    if(window.getSelection().toString().trim() !== '') {
        word = window.getSelection().toString().trim();
        chrome.storage.sync.set({
            "selectedWord": word
        })
    }
}

// chrome.runtime.onMessage.addListener(sendWord);
// function sendWord(request, sender, response) {
//     const { type } = request;
//     const selectedWord = word;
//     console.log('selected word is ' + word);

//     if( type === "NEWWORD" ) {
//         chrome.runtime.sendMessage({
//             type: "RELOAD"
//         })
//         console.log('palavra enviada');
//     }
// }