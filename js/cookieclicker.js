updateStats();

function getCookies() {
    if (localStorage.getItem("cookie-amount") == null) {
        localStorage.setItem("cookie-amount", 0);
    }
    return Number(localStorage.getItem("cookie-amount"));
}

function cookieClick() {
    localStorage.setItem("cookie-amount", getCookies() + getCookiePerClick());
    updateStats();
}

function getCookiePerClick() {
    if (localStorage.getItem("cookie-per-click") == null) {
        localStorage.setItem("cookie-per-click", 1);
    }
    return Number(localStorage.getItem("cookie-per-click"));
}

function upgradePerClick(cost, amountAdd) {
    if (localStorage.getItem("cookie-amount") >= cost) {
        localStorage.setItem("cookie-amount", Number(localStorage.getItem("cookie-amount")) - cost);
        localStorage.setItem("cookie-per-click", Number(localStorage.getItem("cookie-per-click")) + amountAdd);
        updateStats();
    }
}

function updateStats() {
    document.getElementById("cookie-per-click").textContent = getCookiePerClick();
    document.getElementById("cookie-amount").textContent = getCookies();
}