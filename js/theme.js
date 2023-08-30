function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

(function () {
    if (localStorage.getItem('theme') === 'dark') {
        setTheme('dark');
    }
    else if (localStorage.getItem('theme') === 'light') {
        setTheme('light');
    }
    else if (localStorage.getItem('theme') === 'white') {
        setTheme('white');
    }
    else if (localStorage.getItem('theme') === 'black') {
        setTheme('black');
    }
    else if (localStorage.getItem('theme') === 'glass') {
        setTheme('glass');
    }

    else {
        setTheme('glass');
    }
})();