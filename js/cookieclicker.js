updateStats();
run();

function getCookies() {
    if (localStorage.getItem("cookie-amount") == null) {
        localStorage.setItem("cookie-amount", 0);
    }
    return Number(localStorage.getItem("cookie-amount"));
}

function cookieClick() {
    var cookieToAdd = getCookiePerClick() * getCookiePerClickMultiplied();
    localStorage.setItem("cookie-amount", getCookies() + cookieToAdd);
    updateStats();
}

function getCookiePerClick() {
    if (localStorage.getItem("cookie-per-click") == null) {
        localStorage.setItem("cookie-per-click", 1);
    }
    return Number(localStorage.getItem("cookie-per-click"));
}

function getCookiePerClickMultiplied() {
    return (1 + (getCookieMultiplicator() * 0.05));
}

function getClickPerSecond() {
    if (localStorage.getItem("click-auto-sec") == null) {
        localStorage.setItem("click-auto-sec", 0);
    }
    return Number(localStorage.getItem("click-auto-sec"));
}

function getCookiePerSecond() {
    var ClickSec = getClickPerSecond();
    var CookiePerClick = getCookiePerClick();

    var CookiePerSec = ClickSec * CookiePerClick;
    return CookiePerSec;
}

function getCookieMultiplicator() {
    if (localStorage.getItem("cookie-multiplicator") == null) {
        localStorage.setItem("cookie-multiplicator", 0);
    }
    return Number(localStorage.getItem("cookie-multiplicator"));
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
    document.getElementById("click-per-second").textContent = getClickPerSecond();
    document.getElementById("cookie-per-second").textContent = getCookiePerSecond();
    document.getElementById("cookie-multiplier").textContent = getCookiePerClickMultiplied() * 100 +"%";
}

function bonusClick(bonus) {
    if (bonus == 1 && buyBonus(10)) {
        localStorage.setItem("cookie-per-click", Number(localStorage.getItem("cookie-per-click")) + 1);
    }

    else if (bonus == 2 && buyBonus(250)) {
        localStorage.setItem("click-auto-sec", Number(localStorage.getItem("click-auto-sec")) + 1);
    }

    else if (bonus == 3) {
        localStorage.setItem("cookie-multiplicator", Number(localStorage.getItem("cookie-multiplicator")) + 1);
    }

    else if (bonus == 4) {
        localStorage.setItem("jesus", Number(localStorage.getItem("jesus")) + 1);
    }

    updateStats();
}

function run() {
    return new Promise(async (resolve, reject) => {
        setInterval(() => {
            var ClickSec = getClickPerSecond();
            var CookiePerClick = getCookiePerClick();

            var CookiePerSec = ClickSec * CookiePerClick;

            localStorage.setItem("cookie-amount", getCookies() + CookiePerSec / 2);
            updateStats();

            resolve();
        }, 500);
    });
}
