include_all();

async function include_all() {
    await include("/html/includes/head.html", "head", false);
    await include_css("/css/user-agent.css");
    await include_css("/css/utils.css");
    await include_css("/css/body.css");

    await include_css("/css/header.css");
    await include("/html/includes/header.html", "body");
    await include_css("/css/menu.css");
    await include("/html/includes/menu.html", "header", true);

    await include_css("/css/anchor.css");
    await include("/html/includes/anchor.html", "body", false);

    await include_css("/css/content.css");
    await include("/html/includes/content.html", "body");

    await include_css("/css/footer.css");
    await include("/html/includes/footer.html", "body", false);


    await custom_pages_include();
}

async function custom_pages_include() {
    var pathname = window.location.pathname;
    console.log(pathname);
    if (pathname == "/") {
        pathname += "index.html";
    }

    if (pathname === "/index.html") {
        await include("/html/contents/home.html", "content", true);
    }


    else if (pathname === "/stats/") {
        await include("/html/contents/home.html", "content", true);
    }

    /*else if (pathname.startsWith("/...../")) {

    }*/

    else if (pathname === "/404.html" || pathname === "/404" || pathname === "/404/") {
        await include("/pages/contents/404.html", "content", true);
    } else {
        await include("/pages/contents/404.html", "content", true);
    }
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