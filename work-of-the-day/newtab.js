
chrome.runtime.sendMessage({type: "FETCH"}, (response) => {
    const h1 = document.getElementsByTagName("h1")[0];
    const p = document.getElementsByTagName("p")[0];

    h1.innerText = response.word;
    p.innerText = response.description;
})