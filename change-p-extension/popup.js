document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById("userInput");
    input.addEventListener("change", handleChange);

    function handleChange() {  
        chrome.tabs.query({
            currentWindow: true,
            active: true
        }, sendMessage)

        function sendMessage(tabs) {
            const inputMessage = input.value;
            console.log("input value", inputMessage);
            const message = {
                txt: inputMessage
            }
            chrome.tabs.sendMessage(tabs[0].id, message);
        }
    }
})