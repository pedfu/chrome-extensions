(() => {
    let blockedWebsites = [];
    let currentWebsite = window.location.host;

    chrome.runtime.onMessage.addListener((request, sender, response) => {
        console.log('oi');
        console.log(request);
    })   
    
})();

// receber mensagem do background e verificar se o site esta na lista de bloqueados
// caso sim, bloquear acesso ou substituir o html da pagina por um escrito tipo
// <h1>Site bloqueado por NoDistractions</h1>
// <p>To unblock, go to extensions and click in X icon next to this website</p>

// adicionar site + tempo (opcional)
// tempo pode ser em minutos
// tempo pode ser até uma data
// caso o tempo não seja informado, será infinito.

// cada item terá um X do lado para cancelar antes do tempo acabar

// checa se tem / no final, se tem, tira. e ve se tem na lista la o site.algo