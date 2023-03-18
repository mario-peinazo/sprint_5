// TIEMPO

let lon;
let lat;
let icon_img;
let img_temp = document.createElement("img");

const temperature = document.getElementById("temp");
const summary = document.getElementById("summary");
const loc = document.getElementById("location");
const icon = document.getElementById("icon");

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const API_URL_W = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9066f182efda7e4b3b6533aa6bb296d6`;

      fetch(API_URL_W)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          temperature.textContent = Math.floor(data.main.temp - 273.15) + "ºC";
          loc.textContent = data.name;
          icon_img = data.weather[0].icon;
          img_temp.src = `http://openweathermap.org/img/wn/${icon_img}@2x.png`;
          icon.appendChild(img_temp);
        });
    });
  }
});

// GENERAR Y MOSTRAR CHISTES

const API_URL0 = "https://icanhazdadjoke.com";
const API_URL1 = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,racist,sexist,explicit&type=single";
const API_URL2 = "https://api.chucknorris.io/jokes/random";

const HTMLResponse = document.getElementById("chiste");

let chiste = "";

function mostrarChiste() {
  if (chiste != "") {
    getScore(chiste);
    score = 0;
  }

  let numRandom = Math.floor(Math.random() * 3);

  switch (numRandom) {
    case 0:
      fetch(API_URL0, { headers: { Accept: "application/json" } })
        .then((response) => response.json())
        .then((joke) => {
          HTMLResponse.textContent = joke.joke;
          chiste = joke.joke;
        });
      break;
    case 1:
        fetch(API_URL1)
        .then((response) => response.json())
        .then((joke) => {
          HTMLResponse.textContent = joke.joke;
          chiste = joke.joke;
        });
      break;
    case 2:
        fetch(API_URL2)
        .then((response) => response.json())
        .then((joke) => {
          HTMLResponse.textContent = joke.value;
          chiste = joke.value;
        });
      break;
  }

  document.getElementById("score").style.display = "block";
}

// GUARDAR PUNTUACIÓN CHISTES

const reportJokes = [];

let score = 0;

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
  const d = new Date();
  let text = d.toISOString();

  const data = {
    joke: joke,
    resultado: score,
    date: text,
  };

  reportJokes.push(data);
  console.log(reportJokes);
}
