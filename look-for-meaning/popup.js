// when DOMloaded, send a message to background asking for selected word
// bakcgorund sends a request for the seleted word for the content

const getData = () => {
    return new Promise((resolve) => {
        chrome.storage.sync.get('selectedWord', (obj) => {
            resolve(obj['selectedWord']);
        })
    })
}

const getSelectedWord = async () => {
    const selectedWord = await getData();
    let definition = '';
    console.log(selectedWord);
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '016c0c1e1emsh61837d8c2c21561p190b02jsn9ebd0d8aa631',
            'X-RapidAPI-Host': 'mashape-community-urban-dictionary.p.rapidapi.com'
        }
    };
    
    fetch(`https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=${selectedWord}`, options)
        .then(response => response.json())
        .then(response => definition = response)
        .then(() => {
            const word = document.getElementById("text");
            const def = document.getElementById("definition");
            word.innerText = selectedWord;
            def.innerText = definition?.list[0].definition ? definition.list[0].definition : '';
        })
        .catch(err => console.error(err));    
}

document.addEventListener("DOMContentLoaded", getSelectedWord);
