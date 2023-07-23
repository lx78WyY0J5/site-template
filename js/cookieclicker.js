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

function buyBonus(price) {
    if (localStorage.getItem("cookie-amount") >= price) {
        localStorage.setItem("cookie-amount", Number(localStorage.getItem("cookie-amount")) - price);
        updateStats();
        return true;
    }
    return false;
}

function updateStats() {
    document.getElementById("cookie-per-click").textContent = getCookiePerClick();
    document.getElementById("cookie-amount").textContent = getCookies();
}

function bonusClick(bonus) {
    if (bonus == 1 && buyBonus(10)) {
        localStorage.setItem("cookie-per-click", Number(localStorage.getItem("cookie-per-click")) + 1);
        updateStats();
    }

    else if (bonus == 2) {

    }

    else if (bonus == 3) {

    }

    else if (bonus == 4) {

    }
}