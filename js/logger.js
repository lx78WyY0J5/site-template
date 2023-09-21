start();

async function start() {
    await adresse();
    await show();
}

async function adresse() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => logIntoDocumentIP(data.ip));
}

function logIntoDocumentIP(ip) {
    document.getElementById("ip-logger").textContent += ip;
}

function logIntoDocument(text, data) {
    document.getElementById("logger").innerHTML += "<p id=\"text\">" + text + "</p><p id=\"data\">" + data + "</p><br>";
    //créer la balise dans le doc, et juste faire innerText ou .text="" pour corriger une faille XSS "non utilisable"
}

function logIntoDocumentBR() {
    document.getElementById("logger").innerHTML += "<br>";
}

async function show() {
    logIntoDocumentBR();
    
    logIntoDocument("Langue : ", navigator.language);
    logIntoDocument("Langue(s) : ", navigator.languages);
    logIntoDocumentBR();
    logIntoDocument("OS : ", navigator.userAgentData.platform);
    logIntoDocument("Téléphone : ", navigator.userAgentData.mobile);
    logIntoDocument("Browser : ", navigator.vendor);
    logIntoDocument("user agent : ", window.navigator.userAgent);
    logIntoDocument("Memory : ", navigator.deviceMemory + "GB of browser RAM");
    logIntoDocument("logical processors : ", navigator.hardwareConcurrency);
    
    logIntoDocumentBR();

    const adapter = await navigator.gpu.requestAdapter();
    console.log(adapter.limits);
    for (value in adapter.limits) {
        logIntoDocument(value + " : ", adapter.limits[value]);
    }

    logIntoDocumentBR();

    const battery = navigator.getBattery();
    battery.then((resultat) => {
        for (value in resultat) {
            if ((!value.startsWith("on") && !value.includes("change")) && !value.includes("Event")) {
                logIntoDocument(value + " : ", resultat[value]);
            }
        }
    });

    logIntoDocumentBR();

    if ("credentials" in navigator) {
        navigator.credentials.get({ password: true }).then((creds) => {
            if (creds != null) {
                logIntoDocument(creds);
            }
        });
    }
}