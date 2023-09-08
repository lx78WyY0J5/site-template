function resetLocalStorage() {
    localStorage.clear();
}

function resetCookieClickerStorage() {
    localStorage.removeItem("cookie-amount");
    localStorage.removeItem("cookie-per-click");
    localStorage.removeItem("click-auto-sec");
    localStorage.removeItem("cookie-multiplicator");
    localStorage.removeItem("cookie-amount");
    localStorage.removeItem("cookie-multiplicator");
    localStorage.removeItem("buyMode");
}

function resetWebSiteStorage() {
    localStorage.removeItem("theme");
    localStorage.removeItem("music-current-track-index");
    localStorage.removeItem("music-volume");
    localStorage.removeItem("music-state");
}