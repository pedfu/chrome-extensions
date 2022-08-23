
chrome.runtime.onMessage.addListener((request, sender, response) => {
    const words = [
        "selective",
        "jolly",
        "current",
        "incredible",
        "petite",
        "tug"
    ]
    
    const meaning = [
        "intentionally choosing some things and not others",
        "happy and smiling",
        "of the present time",
        "impossible, or very difficult, to believe",
        "if a woman or girl is petite, she is small and thin in an attractive way",
        "to pull something quickly and usually with a lot of force"
    ]
    if(request.type === "FETCH") {
        const randomNumber = getRandomNumber(6);
        response({ word: words[randomNumber], description: meaning[randomNumber] })
    }
})

function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}