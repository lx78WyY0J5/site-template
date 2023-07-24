custom_pages_include();

async function include_all() {
    await include_css("/css/variables.css");
    await include_css("/css/user-agent.css");
    await include_script("/js/theme.js");
    await include_css("/css/text.css");
    await include_css("/css/utils.css");
    await include_css("/css/body.css");

    await include_css("/css/header.css");
    await include("/html/includes/header.html", "body");

    await include_css("/css/content.css");
    await include("/html/includes/content.html", "body");

    await include_css("/css/anchor.css");
    await include("/html/includes/anchor.html", "contentAnchor", true);
    await include_script("/js/music.js");

    await include_css("/css/footer.css");
    await include("/html/includes/footer.html", "body", false);
}

async function custom_pages_include() {
    var pathname = window.location.pathname;
    console.log(pathname);

    if (pathname == "/") {
        pathname += "index.html"; console.log("index / rewrite");
    }

    if (pathname === "/index/" || pathname === "/index" || pathname === "/index.html/" || pathname === "/index.html") {
        await include_all();

        await include("/html/contents/home.html", "contentHolder", true);

        await include("/html/contents/matriceHolder.html", "contentHolder", true);
        await include_multiple("matrice", "matriceHolder");

        await include_multiple("viewCount", "contentHolder");
    }

    else if (pathname === "/discord/" || pathname === "/discord" || pathname === "/discord.html/" || pathname === "/discord.html") {
        await include_all();
        await include_multiple("viewCount", "contentHolder");
    }

    else if (pathname === "/discuter/" || pathname === "/discuter" || pathname === "/discuter.html/" || pathname === "/discuter.html") {
        await include_all();
        await include_multiple("viewCount", "contentHolder");
    }

    else if (pathname === "/github/" || pathname === "/github" || pathname === "/github.html/" || pathname === "/github.html") {
        await include_all();
        await include_multiple("github_update", "contentHolder");
        await include_multiple("viewCount", "contentHolder");
    }

    else if (pathname === "/jeux/" || pathname === "/jeux" || pathname === "/jeux.html/" || pathname === "/jeux.html") {
        await include_all();

        await include_multiple("viewCount", "contentHolder");
    }

    else if (pathname === "/films/" || pathname === "/films" || pathname === "/films.html/" || pathname === "/films.html") {
        await include_all();
        await include_multiple("films", "contentHolder");

        await include_multiple("viewCount", "contentHolder");
    }

    else if (pathname === "/stats/" || pathname === "/stats" || pathname === "/stats.html/" || pathname === "/stats.html") {
        await include_all();
        await include_multiple("github_update", "contentHolder");
        await include_multiple("viewCount", "contentHolder");
    }

    else if (pathname === "/homepage/" || pathname === "/homepage" || pathname === "/homepage.html/" || pathname === "/homepage.html") {
        await include_all();

        await include("/html/contents/matriceHolder.html", "contentHolder", true);
        await include_multiple("matrice", "matriceHolder");

        await include_multiple("ping", "contentHolder");
        await include_multiple("date", "contentHolder");

        await include_multiple("github_update", "contentHolder");
        await include_multiple("viewCount", "contentHolder");
    }

    else if (pathname === "/techno/" || pathname === "/techno" || pathname === "/techno.html/" || pathname === "/techno.html") {
        await include_all();
        await include_css("/css/techno.css");
        await include("/html/contents/techno.html", "contentHolder", true);

        await include_multiple("viewCount", "contentHolder");
    }

    else if (pathname === "/musique/" || pathname === "/musique" || pathname === "/musique.html/" || pathname === "/musique.html") {
        await include_all();
        await include("/html/contents/musique.html", "contentHolder", true);
        await include_css("/css/musique.css");

        await include_multiple("viewCount", "contentHolder");
    }

    else if (pathname === "/matrice/" || pathname === "/matrice" || pathname === "/matrice.html/" || pathname === "/matrice.html") {
        await include("/html/includes/content.html", "body");
        await include_multiple("matrice", "contentHolder");
    }

    else if (pathname === "/cookieclicker/" || pathname === "/cookieclicker" || pathname === "/cookieclicker.html/" || pathname === "/cookieclicker.html") {
        await include("/html/includes/content.html", "body");
        await include_multiple("cookieclicker", "contentHolder");
    }


    /*else if (pathname.startsWith("/..../")) {    }*/

    else if (pathname === "/404.html" || pathname === "/404.html/" || pathname === "/404" || pathname === "/404/") {
        await include_all();
        await include("/html/contents/404Custom.html", "contentHolder", true);

        await include_css("/css/404.css");

        await include("/html/contents/poney.html", "contentHolder", true);

        await include_multiple("github_update", "contentHolder");
        await include_multiple("viewCount", "contentHolder");
    }

    else {
        await include_all();
        await include("/html/contents/404.html", "contentHolder", true);

        await include_css("/css/404.css");

        await include_multiple("github_update", "contentHolder");
        await include_multiple("viewCount", "contentHolder");
    }
}

async function include_multiple(name, area) {
    await include_css("/css/" + name + ".css");
    await include("/html/contents/" + name + ".html", area, true);
    await include_script("/js/" + name + ".js");
}

async function include(link, query, queryOrIndex) {
    let response = await fetch(link)
        .then(response => {
            return response.text()
        })
        .then(data => {
            if (queryOrIndex) {
                document.getElementById(query).innerHTML += data;
            } else {
                document.querySelector(query).innerHTML += data;
            }
        })
        .catch(error => {
            console.log(error);
        });
}

async function include_script(url) {
    var script = document.createElement("script");
    script.src = url;
    document.head.appendChild(script);
}

async function include_css(url) {
    var head = document.getElementsByTagName('HEAD')[0];

    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;

    head.appendChild(link);
}

async function include_md(url, query) {
    let response = await fetch(url)
        .then(response => {
            return response.text()
        })
        .then(data => {
            let MDText = parseMd(data);
            document.getElementById(query).innerHTML += MDText;
        })
        .catch(error => {
            console.log(error);
        });
}

async function include_md_indiv(url, query) {
    let response = await fetch(url)
        .then(response => {
            return response.text()
        })
        .then(data => {
            let MDText = parseMd(data);
            document.getElementById(query).innerHTML += "<div class=\"card container-large text-font\">" + MDText + "</div>";
        })
        .catch(error => {
            console.log(error);
        });
}