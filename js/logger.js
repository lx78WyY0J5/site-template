start();

async function start() {
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => logIntoDocument(data.ip));
}

function logIntoDocument(ip) {
    document.getElementById("ip-logger").textContent = ip;
}