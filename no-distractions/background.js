// chrome.tabs.onUpdated.addListener((tabId, tab) => {
//   if(tab.url && tab.url.includes("youtube.com/watch")) {
//     const queryParameters = tab.url.split("?")[1];
//     const urlParameters = new URLSearchParams(queryParameters);

//     chrome.tabs.sendMessage(tabId, {
//       type: "NEW",
//       videoId: urlParameters.get("v"),
//     })
//   }
// });

chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if(tab.url) {
    console.log(tab.url);
    const mainURL = tab.url.replace("https://", "");
    console.log(mainURL);

    chrome.tabs.sendMessage(tabId, {
      type: "NEWTAB",
      url: tab.url
    })
  }
})

chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
  let url = tabs[0].url;
  chrome.runtime.sendMessage({
    url: url
  })
  
  // use `url` here inside the callback because it's asynchronous!
});

chrome.webRequest.onBeforeRequest.addListener((details) => {
  chrome.runtime.sendMessage({
    url: details
  })
  chrome.tabs.sendMessage({
    type: "NEWTAB",
    url: details
  })
})

// toda vez que abrir uma nova tab, eu mando uma mensagem com type NEW e o website
// dai no contentScript eu recebo e verifico se a url esta entre as bloqueadas
// caso sim, eu bloqueio