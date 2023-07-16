async function setViewCount() {
    var global = await getPromise("lx78wyy0j5/lx78wyy0j5.github.io");
    document.getElementById("global-viewcount").textContent = global;

    var pathname = window.location.pathname;

    var pathnameDot = pathname.replace("/", ".");
    var pathnameHTML = pathnameDot.replace(".html", "");
    if (pathnameHTML == ".") {
        pathnameHTML = ".index";
    }
    
    if (pathname == "/") {
        pathname = "/index"
    }

    var globalPage = await getPromise("lx78wyy0j5/lx78wyy0j5.github.io" + pathnameHTML);
    document.getElementById("page-name").textContent = pathname.replace(".html", "");
    document.getElementById("page-viewcount").textContent = globalPage;

    var globalPageUnique = globalPage + global;
    document.getElementById("total-viewcount").textContent = globalPageUnique;
}

const getPromise = async (repo, callback) => {
    let data = await fetch("https://visit-counter.vercel.app/counter?page=" + repo); console.log(data);
    let value = await data.json(); console.log(value);
    return value;
}

const getActivity = async () => {
    let count = await getPromise(repo);
    console.log("fin : " + count);
}

setViewCount();