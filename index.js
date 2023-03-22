// TIEMPO
var lon;
var lat;
var icon_img;
var img_temp = document.createElement("img");
var temperature = document.getElementById("temp");
var icon = document.getElementById("icon");
window.addEventListener("load", function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            var API_URL_W = "https://api.openweathermap.org/data/2.5/weather?lat=".concat(lat, "&lon=").concat(lon, "&appid=9066f182efda7e4b3b6533aa6bb296d6");
            fetch(API_URL_W)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                console.log(data);
                temperature.textContent = Math.floor(data.main.temp - 273.15) + "ºC";
                icon_img = data.weather[0].icon;
                img_temp.src = "http://openweathermap.org/img/wn/".concat(icon_img, "@2x.png");
                icon.appendChild(img_temp);
            });
        });
    }
});
// GENERAR Y MOSTRAR CHISTES
var API_URL0 = "https://icanhazdadjoke.com";
var API_URL1 = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,racist,sexist,explicit&type=single";
var API_URL2 = "https://api.chucknorris.io/jokes/random";
var HTMLResponse = document.getElementById("chiste");
var img1 = document.getElementById("img-fondo");
var img2 = document.getElementById("img-fondo1");
var img3 = document.getElementById("img-fondo2");
var HTMLScore = document.getElementById("score");
var iw = window.innerWidth;
var chiste = "";
function mostrarChiste() {
    if (chiste != "") {
        getScore(chiste);
        score = 0;
    }
    var numRandom = Math.floor(Math.random() * 3);
    switch (numRandom) {
        case 0:
            fetch(API_URL0, { headers: { Accept: "application/json" } })
                .then(function (response) { return response.json(); })
                .then(function (joke) {
                HTMLResponse.textContent = joke.joke;
                chiste = joke.joke;
                img1.src = "./img/blob1.svg";
                img2.src = "./img/blob1-1.svg";
                img3.src = "./img/blob1-2.svg";
            });
            break;
        case 1:
            fetch(API_URL1)
                .then(function (response) { return response.json(); })
                .then(function (joke) {
                HTMLResponse.textContent = joke.joke;
                chiste = joke.joke;
                img1.src = "./img/blob2.svg";
                img2.src = "./img/blob2-1.svg";
                img3.src = "./img/blob2-2.svg";
            });
            break;
        case 2:
            fetch(API_URL2)
                .then(function (response) { return response.json(); })
                .then(function (joke) {
                HTMLResponse.textContent = joke.value;
                chiste = joke.value;
                img1.src = "./img/blob5-2.svg";
                img2.src = "./img/blob5-1.svg";
                img3.src = "./img/blob5.svg";
            });
            break;
    }
    HTMLScore.style.display = "block";
}
// GUARDAR PUNTUACIÓN CHISTES
var reportJokes = [];
var score = 0;
function getValue(value) {
    switch (value) {
        case 1:
            score = 1;
            break;
        case 2:
            score = 2;
            break;
        case 3:
            score = 3;
            break;
    }
}
function getScore(joke) {
    var d = new Date();
    var text = d.toISOString();
    var data = {
        joke: joke,
        resultado: score,
        date: text,
    };
    reportJokes.push(data);
    console.log(reportJokes);
}
