function cipher() {
    getData();
}

function getData() {
    var text = document.getElementById("input").value;
    var number = document.getElementById("number").value;

    if (text !== "" && number !== "") {
        cipherText(text, number);
    }
}

function cipherText(text, rotation) {
    document.getElementById("output").value = "";
    for (let letter of text) {
        console.log(letter.charCodeAt(0));
        value = parseInt(letter.charCodeAt(0)) + parseInt(rotation);
        console.log(value);
        document.getElementById("output").value += String.fromCharCode(value);
    }
}