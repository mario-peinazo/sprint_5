// GENERAR Y MOSTRAR CHISTES

const API_URL = "https://icanhazdadjoke.com";

const HTMLResponse = document.getElementById("chiste");

let chiste = "";

function mostrarChiste(){
    if (chiste != "") {
        getScore(chiste);
        score = 0;
    }
    
  fetch(API_URL, { headers: { Accept: "application/json" } })
    .then((response) => response.json())
    .then((joke) => {
      HTMLResponse.textContent = joke.joke;
      chiste = joke.joke
    });

    document.getElementById("score").style.display = 'block';
}


// GUARDAR PUNTUACIÓN CHISTES

const reportJokes = [];

let score = 0;

function getValue(value){
    switch(value){
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
        date: text
    }

    reportJokes.push(data)
    console.log(reportJokes)
}
