setViewCount();

async function setViewCount() {

    var global = await gather('https://hits.dwyl.com/lx78wyy0j5/lx78wyy0j5githubio');
    var globalHit = getValue(global[0], "message");
    document.getElementById("total-number").textContent = globalHit;

    var globalUnique = await gather('https://hits.dwyl.com/lx78wyy0j5/lx78wyy0j5githubio.json?show=unique');
    var globalUniqueHit = getValue(globalUnique[0], "message");
    document.getElementById("unique-total-number").textContent = globalUniqueHit;

    var pathname = window.location.pathname;
    document.getElementById("page-name").textContent = pathname;
    var pathnameDot = pathname.replace("/", ".");
    var pathnameHTML = pathnameDot.replace(".html", "");

    var globalPage = await gather('https://hits.dwyl.com/lx78wyy0j5/lx78wyy0j5githubio' + pathnameHTML + '.json');
    var globalPageHit = getValue(globalPage[0], "message");
    document.getElementById("total-page-number").textContent = globalPageHit;

    var globalPageUnique = await gather('https://hits.dwyl.com/lx78wyy0j5/lx78wyy0j5githubio' + pathnameHTML + '.json?show=unique');
    var globalPageUniqueHit = getValue(globalPageUnique[0], "message");
    document.getElementById("unique-total-page-number").textContent = globalPageUniqueHit;
}

function gather(url) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            fetch(url, {
                method: 'GET',
                crossorigin: true,
                mode: 'no-cors'
            })
                .then(response => console.log(response))
                .then(data => {
                    console.log(data);
                    return;
                })
                .catch(error => console.error(error))
        }, 1000);
    });
}

function getValue(obj, key) {
    var value;
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (i == key) {
            value = obj[i];
            break;
        }
    }
    return value;
}  