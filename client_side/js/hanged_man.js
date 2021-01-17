
$("body").append("<div class=\"container-fluid bg-cover\" id=\"sfondo\" style=\"background-color: #54befa; background-repeat: no-repeat;background-position: center; min-height: 100vh; background-size: cover;\"><div class=\"row\" style=\"height: 15vh\"><div class=\"col-sm\"><h1 style=\"text-align: center; font-size:7vh; margin-top:5%; font-family: Brush Script MT\"><b><i>Impiccato</i></b></h1></div></div>")
$("#sfondo").append("<div class=\"container\"><div class=\"row\" style=\"height: 15vh\"><div class=\"col-sm\"><div id =\"risposta\" style=\"text-align: center; font-size:3vh;\"></div></div></div></div>")
$("#risposta").append("<p id=\"frase\" style=\" text-align: center; font-size:5vh; margin-top:10%; font-family: Brush Script MT\">La risposta è:</p><div id=\"interazione\"><p id=\"suggerimento\"></p><input type=\"text\" id=\"insert\" style=\"border-radius:20px; font-size:5vh; font-family: Brush Script MT; text-align: center\" onfocus=\"this.value=''\" value=\"inserisci la risposta\"> <br> </input><button style= \"border-radius:20px; margin-top:2%; font-family: Brush Script MT\"onclick=\"controlla()\">Invia la risposta</button></div>")


function intParser(string_in) {
    const parsed = parseInt(string_in, 10);
    if (isNaN(parsed) && (parsed !== null)) {
        return 1;
    }
    return parsed;
}
function getQueryVariable(variable_in) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable_in) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable_in);
}
const missionID = intParser(getQueryVariable('id_missione'));
console.log('id della mission', missionID)
const myJson = localStorage.getItem('myJson')
const myJsonParsed = JSON.parse(myJson)
const risposta = myJsonParsed.missioni[missionID].answers
const domanda = myJsonParsed.missioni[missionID].question
console.log('DOMANDA E RISPOSTA', domanda, risposta)
var parola = risposta[0];
var bits = new Array(parola.length).fill(0);
bits[0] = 1;
bits[bits.length - 1] = 1;
var tentativi = 0;
var tentativi_max = parola.length - 3;
var incompleta = calcolaincompleta(parola, bits);

function calcolaincompleta(parola, bits) {
    incompleta = ""
    for (i = 0; i < parola.length; i++) {
        if (bits[i] == 0) {
            incompleta = incompleta + "-"
        } else { incompleta = incompleta + parola[i] }
    }
    document.getElementById("suggerimento").innerHTML = incompleta
    return incompleta
}

function calcolarandom(vettore) {
    var betaindex = vettore.map(function (valore, indice) { if (valore == 0) { return indice } });
    while (betaindex.findIndex(function (valore, indice) { return valore == undefined }) > -1) {
        betaindex.map(function (valore, indice) { if (valore == undefined) { betaindex.splice(indice, 1) } });
    }
    return betaindex[Math.floor(Math.random() * (betaindex.length))]
}

function aggiornabits(bits, tentativi) {
    tentativi = tentativi + 1
    numero = calcolarandom(bits)
    bits[numero] = 1
    return [bits, tentativi]
}

function controlla() {


    inserita = $("#insert").val()
    if (inserita.toLowerCase() == parola.toLowerCase()) {
        alert("COMPLIMENTI! La risposta è esatta")
        $("#interazione").empty()
        $("#interazione").append("<button id=\"prosegui\" onclick= \"proseguire()\">Clicca per proseguire</button>")
    } else if (tentativi == tentativi_max) {
        document.getElementById("suggerimento").innerHTML = parola
        alert("Hai terminato i tentativi a disposizione! Clicca per proseguire...")
        $("#interazione").empty()
        $("#interazione").append("<button id=\"prosegui\" onclick= \"proseguire()\">Clicca per proseguire</button>")
    } else {
        rslt = aggiornabits(bits, tentativi)
        bits = rslt[0]; tentativi = rslt[1];
        incompleta = calcolaincompleta(parola, bits)
    }
}
function proseguire() {
    const myJsonID = localStorage.getItem('myJsonID')
    window.location.href = `map.html?&id=${myJsonID}`
}
