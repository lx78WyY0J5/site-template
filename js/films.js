const anime = ["tt11680468", "tt0421357", "tt1355642", "tt3909224", "tt6660498", "tt2259737", "tt5537534", "tt13103134", "tt0423731", "tt1316554", "tt0877057", "tt5626028"];
const films = ["tt2084970", "tt0988045", "tt1515091", "tt1241317", "tt9783600"];
const series = ["tt1586680", "tt0898266", "tt6226232", "tt1475582", "tt4158110"];

run();
async function run() {
    getData(films, ".filmsID");
    getData(anime, ".animesID");
    getData(series, ".seriesID");
}

async function getData(array, id) {
    for (let movieID in array) {
        let data = await gather("https://imdb-api.projects.thetuhin.com/title/" + array[movieID]);

        let div = document.createElement("div");
        div.className = "card-red-effect";

        let title = document.createElement("a");
        title.textContent = await getValue(data, "title");
        title.href = await getValue(data, "imdb");
        div.appendChild(title);

        let img = document.createElement("img");
        img.loading = "lazy";
        img.src = await getValue(data, "image");
        div.appendChild(img);

        let text = document.createElement("p");
        text.textContent = await getValue(data, "plot");
        div.appendChild(text);

        let divContainer = document.querySelector(id);
        divContainer.appendChild(div);
    }
}

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
        }, 5000);
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