var symbolContainer = document.querySelector(".symbol-container");
//const symbols = ["$", "%", "#", "*", "@", "&", "!", "?"];
const symbolCount = 1500;

for (let i = 0; i < symbolCount; i++) {
    var symbol = document.createElement("div");
    symbol.className = "symbol";
    //symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.textContent = randomChar();
    symbol.style.left = Math.random() * 100 + "%";
    symbol.style.animationDelay = ((Math.random() + 0.2)) + "s";
    symbol.style.animationDuration = ((Math.random() + 0.2) * 10) + "s";
    symbolContainer.appendChild(symbol);
}

function randomChar() {
    var min = 33;
    var max = 10000;
    var r = Math.random() * (max - min) + min << 0;
    var string = String.fromCharCode(r);
    return string;
} 