function intParser(string_in) {
    const parsed = parseInt(string_in, 10);
    if (isNaN(parsed) && (parsed !== null)) {
        return 1;
    }
    return parsed;
}

function getQueryVariable(variable_in) {
    // cerco il valore della variabile richiessta all'interno della query
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        //separo le variabili dai loro valori
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable_in) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable_in);
}
const missionID = intParser(getQueryVariable('id_missione'));
console.log('ID della mission', missionID)
const myJson = localStorage.getItem('myJson')
const myJsonParsed = JSON.parse(myJson)
const myJsonID = localStorage.getItem('myJsonID')
const risp = myJsonParsed.missioni[missionID].answers
const domanda = myJsonParsed.missioni[missionID].question[4]
//const risp = ['pippo', 'pluto','paperino','topolino']
//const domanda = "dovete dirmi il colore dello sfondo del quadro fatto dal pirata MONET...al suo interno ha una grande spiaggia..."

const corretta = risp[0] // la risposta corretta è sempre la prima nel JSON

// Creo sequenza randomica
var arr = [];
while(arr.length < risp.length){
    var r = Math.floor(Math.random() * risp.length);
    if(arr.indexOf(r) === -1) {
        arr.push(r);}
}
console.log(arr);

window.onload = function () {
    document.getElementById("frase").innerText = domanda;
    rbs = document.querySelectorAll(".option");
    for (let i = 0; i < rbs.length; ++i) {
        // scrivo le opzioni nell'html in posizioni casuali
        document.getElementById("opt"+i).innerText = risp[arr[i]];
    }
};


//  answer-checking function
function evaluate_answer() {
    var ele = document.getElementsByName("optradio");
    var sel = ''
    for (i=0; i<ele.length; i++) {
        if(ele[i].checked) {
            sel = document.getElementById("opt"+i).innerText;
            console.log(sel)
        }
    }
    if (sel == corretta) {
        $("#interazione").empty()
        $("#frase").empty();
        $("#frase").append("<p>Missione Compiuta!</p>");
        $("#interazione").append("<button id=\"prosegui\" onclick= \"prosegui()\"  style=\"font-size: 3vh;font-family: cursive; border-radius:20px; text-align: center;\">Clicca per proseguire</button>")
    } else {
        $("#frase").append("<p>Che peccato, hai sbagliato! Ritenta, questa volta non sbaglierai!</p>");
    }

};

function prosegui() {
    const myJsonID = localStorage.getItem('myJsonID')
    const missionID = intParser(getQueryVariable('id_missione'));

    if(missionID != 9)
        window.location.href = `map.html?&id=${myJsonID}`
    else
        window.location.href = "fine.html"
}
