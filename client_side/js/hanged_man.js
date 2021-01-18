
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

function calcolaincompleta(parola, bits){
    /*permette di calcolare il suggerimento partendo dalla parola da trovare e sostituendo
    alle posizioni dell'array bits con valore 0 un "-" e quelle con valore "1" con la lettera
    ad esso corrispondente*/
    incompleta = ""
    for (i=0; i < parola.length; i++){
        if (bits[i]==0){
            // rimane incognita
            incompleta = incompleta + "-"
        } else {
            // lettera di suggerimento
            incompleta = incompleta + parola[i]
        }
    }
    document.getElementById("suggerimento").innerHTML = incompleta
    return incompleta
}


function calcolarandom(vettore){
    /*permette di calcolare randomicamente un numero corrispondente ad una
    posizione all'interno dell'array bits che verrà sostituita dalla lettera*/

    // cerco indici con "-"
    var betaindex = vettore.map(function(valore, indice){if (valore==0){return indice }});

    while (betaindex.findIndex(function(valore,indice){ return valore == undefined})>-1){
        // è presente almeno un "undefined" (i valori non zero di bits)
        betaindex.map(function(valore,indice){if (valore == undefined){betaindex.splice(indice,1)}});
        // ho eliminato gli "undefined"
    }
    return betaindex[Math.floor(Math.random() * (betaindex.length))] // restituisco indice casuale
}


function aggiornabits (bits,tentativi){
    /*permette l'aggiornamento dell'array bits e del numero di tentativi dell'utente, che
    verranno salvati in un array */
    tentativi = tentativi + 1 // aggiorno tentativi
    numero = calcolarandom (bits) // determino lettera randomica da aggiungere
    bits[numero]= 1 // aggiorno bits
    return [bits, tentativi]
}



function controlla(){
/* permette di controllare se la parola inserita dall'utente sia corretta o meno*/
inserita= $("#insert").val()
if (inserita.toLowerCase() == parola.toLowerCase()){
    /* Parola corretta */
    alert("COMPLIMENTI! La risposta è esatta")
    $("#interazione").empty() // svuoto e sostituisco contenuto della div
    $("#interazione").append("<button id=\"prosegui\" onclick= \"proseguire()\">Clicca per proseguire</button>")
} else if (tentativi == tentativi_max){
    /* Tentativi finiti */
    document.getElementById("suggerimento").innerHTML = parola
    alert("Hai terminato i tentativi a disposizione! Clicca per proseguire...")
    $("#interazione").empty()
    $("#interazione").append("<button id=\"prosegui\" onclick= \"proseguire()\">Clicca per proseguire</button>")
} else {
    /* Parola non corretta */
    rslt = aggiornabits (bits,tentativi) // Aggiungo un suggerimento (lettera)
    bits = rslt[0]; tentativi = rslt[1]; // Aggiorno variabili
    incompleta = calcolaincompleta (parola,bits) // Aggiorno Suggerimento
    }
}
function proseguire() {
	/* permette di tornare alla mappa per proseguire il gioco */
    const myJsonID = localStorage.getItem('myJsonID')
    const missionID = intParser(getQueryVariable('id_missione'));

    if(missionID != 9)
        window.location.href = `map.html?&id=${myJsonID}`
    else
        window.location.href = "fine.html"
}
