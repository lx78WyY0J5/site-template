setInterval(getDate, 500);

function getDate() {
    const date1 = new Date(Date.now());
    var date2 = date1.toLocaleString();

    document.getElementById("date").textContent = date2;
    document.getElementById("dateTimeZone").textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
}