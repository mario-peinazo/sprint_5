// TIEMPO

let lon: number;
let lat: number;
let icon_img: string;
let img_temp = document.createElement("img") as HTMLImageElement;

const temperature = document.getElementById("temp") as HTMLElement;
const icon = document.getElementById("icon") as HTMLElement;

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lon = position.coords.longitude;
      lat = position.coords.latitude;

      const API_URL_W: string = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9066f182efda7e4b3b6533aa6bb296d6`;

      fetch(API_URL_W)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);

          temperature.textContent = Math.floor(data.main.temp - 273.15) + "ºC";
          icon_img = data.weather[0].icon;
          img_temp.src = `http://openweathermap.org/img/wn/${icon_img}@2x.png`;
          icon.appendChild(img_temp);
        });
    });
  }
});

// GENERAR Y MOSTRAR CHISTES

const API_URL0: string = "https://icanhazdadjoke.com";
const API_URL1: string = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=religious,political,racist,sexist,explicit&type=single";
const API_URL2: string = "https://api.chucknorris.io/jokes/random";

const HTMLResponse = document.getElementById("chiste") as HTMLElement;
const img1 = document.getElementById("img-fondo") as HTMLImageElement;
const img2 = document.getElementById("img-fondo1") as HTMLImageElement;
const img3 = document.getElementById("img-fondo2") as HTMLImageElement;
const HTMLScore = document.getElementById("score") as HTMLElement;

const iw = window.innerWidth;

let chiste: string = "";

function mostrarChiste() {
  if (chiste != "") {
    getScore(chiste);
    score = 0;
  }

  let numRandom: number = Math.floor(Math.random() * 3);

  switch (numRandom) {
    case 0:
      fetch(API_URL0, { headers: { Accept: "application/json" } })
        .then((response) => response.json())
        .then((joke) => {
          HTMLResponse.textContent = joke.joke;
          chiste = joke.joke;

          img1.src = "./img/blob1.svg";
          img2.src = "./img/blob1-1.svg";
          img3.src = "./img/blob1-2.svg"; 
        });
      break;
    case 1:
        fetch(API_URL1)
        .then((response) => response.json())
        .then((joke) => {
          HTMLResponse.textContent = joke.joke;
          chiste = joke.joke;

          img1.src = "./img/blob2.svg";
          img2.src = "./img/blob2-1.svg";
          img3.src = "./img/blob2-2.svg";
        });
      break;
    case 2:
        fetch(API_URL2)
        .then((response) => response.json())
        .then((joke) => {
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

const reportJokes: object[] = [];

let score: number = 0;

function getValue(value: number) {
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

function getScore(joke: string) {
  const d = new Date();
  let text = d.toISOString();

  interface dataI {
    joke: string,
    resultado: number,
    date: string
  }
  const data: dataI = {
    joke: joke,
    resultado: score,
    date: text,
  };

  reportJokes.push(data);
  console.log(reportJokes);
}
