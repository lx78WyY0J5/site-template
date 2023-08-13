const anime = ["tt11680468", "tt0421357", "tt1355642", "tt3909224", "tt6660498", "tt2861424", "tt2259737", "tt5537534", "tt13103134", "tt0423731", "tt1316554", "tt0877057", "tt5626028"];
const films = ["tt2084970", "tt0988045", "tt1515091", "tt1241317", "tt9783600"];
const series = ["tt1586680", "tt0898266", "tt6226232", "tt1475582", "tt4158110"];

run();
async function run() {
    await getData(films, ".randomID");
    await getData(anime, ".randomID");
    await getData(series, ".randomID");
}

async function getData(array, id) {
    let x = Math.floor(Math.random() * array.length);
    await showData(array, id, x);
}

async function showData(array, id, movieID) {
    let data = await gather("https://imdb-api.projects.thetuhin.com/title/" + array[movieID]);

    let div = document.createElement("div");
    div.className = "card-red-effect";

    let title = document.createElement("a");
    title.textContent = getValue(data, "title");
    title.href = getValue(data, "imdb");
    div.appendChild(title);

    let img = document.createElement("img");
    img.loading = "lazy";
    img.src = getValue(data, "image");
    div.appendChild(img);

    let text = document.createElement("p");
    text.textContent = getValue(data, "plot");
    div.appendChild(text);

    let divContainer = document.querySelector(id);
    divContainer.appendChild(div);
}

async function gather(url) {
    return new Promise(function (resolve) {
        setTimeout(() => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                    return;
                })
                .catch(error => {
                    console.error(error);
                    return gather(url);
                })
        }, 1500);
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