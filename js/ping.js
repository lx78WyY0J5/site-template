ping("https", "ghub.fr", 443);

async function ping(prot, host, port) {
    document.getElementById("adress").textContent = prot + "://" + host + ":" + port;
    document.getElementById("adress").href = prot + "://" + host + ":" + port;

    var started = new Date().getTime();
    var http = new XMLHttpRequest();

    http.open("GET", prot + "://" + host + ":" + port, true);
    http.onreadystatechange = function () {
        if (http.readyState == http.DONE) {
            var ended = new Date().getTime();
            var milliseconds = ended - started;

            document.getElementById("time").textContent = milliseconds;
            document.getElementById("errorCode").textContent = "Code " + http.DONE;
            document.getElementById("errorCodeDescription").textContent = "OK"
        }
    };

    http.setRequestHeader("Content-Type", "application/json");
    http.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    http.setRequestHeader("Accept", "application/json");
    http.setRequestHeader("Access-Control-Allow-Origin", "*");
    http.setRequestHeader('Access-Control-Allow-Headers', "*");

    http.addEventListener("error", function sendError() {
        document.getElementById("errorCode").textContent = "Code " + http.status;
        document.getElementById("errorCodeDescription").textContent = "erreur non géré"
    });

    try {
        http.send(null);
    } catch (exception) {
        document.getElementById("errorCode").textContent = exception;
        document.getElementById("errorCodeDescription").textContent = "";
        console.log(exception);
    }
}