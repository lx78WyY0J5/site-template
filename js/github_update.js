github_update();

function gather(url) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                    return;
                })
                .catch(error => console.error(error))
        }, 1000);
    });
}

function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
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

function github_update() {
    pageCommit();
}

async function pageCommit() {
    var x = await gather('https://api.github.com/repos/lx78WyY0J5/lx78WyY0J5.github.io/commits');
    var y = getValue(x[0], "sha");
    if (String(y).length >= 8) {
        var y2 = String(y.substring(0, 12) + "...");
    }

    document.getElementById("pageCommit").href += y;
    document.getElementById("pageCommit").textContent = "📊 Update Hash : " + y2;

    var z = getValue(x[0], "commit")
    var z2 = getValue(z, "author");

    var name = getValue(z2, "name");
    document.getElementById("pageAuthor").href += name;
    document.getElementById("pageAuthor").textContent = "@" + name;

    var date = getValue(z2, "date");
    const date1 = new Date(date);
    var date2 = date1.toLocaleString();
    document.getElementById("pageDate").textContent = "⏰ " + date2 + " (local UTC)";

    var message = getValue(z, "message")
    document.getElementById("pageMessage").textContent = "💬 " + message;

    var gatherAvatar = getValue(x[0], "author");
    var avatarGatherValue = getValue(gatherAvatar, "avatar_url");

    document.getElementById("pageAuthorImage").src = avatarGatherValue;
}