
import * as utilities from './utilities.js';

let saveData = new Object;
let parola, domanda, incompleta, inserita, tentativi, tentativi_max, bits, rslt;



window.onload = function()
{
    saveData            = utilities.LSsanityCheck();
    let missionID       = saveData.mission_id;

    parola              = saveData.json.missioni[missionID].answers[0];
    domanda             = saveData.json.missioni[missionID].question[4];

    bits = new Array(parola.length).fill(0);
    bits[0]             = 1;
    bits[bits.length - 1] = 1;
    tentativi           = 0;
    tentativi_max       = parola.length - 3;
    incompleta          = calcolaincompleta(parola, bits);

    document.getElementById("frase").innerText = domanda;
}


function calcolaincompleta(parola, bits)
{
    /*permette di calcolare il suggerimento partendo dalla parola da trovare e sostituendo
    alle posizioni dell'array bits con valore 0 un "-" e quelle con valore "1" con la lettera
    ad esso corrispondente*/
    incompleta = "";
    for (let i = 0; i < parola.length; i++)
    {
        if (bits[i]==0)
        {
            // rimane incognita
            incompleta = incompleta + "-";
        } else
        {
            // lettera di suggerimento
            incompleta = incompleta + parola[i];
        }
    }
    document.getElementById("suggerimento").innerHTML = incompleta;
    return incompleta;
}


function calcolarandom(vettore)
{
    /*permette di calcolare randomicamente un numero corrispondente ad una
    posizione all'interno dell'array bits che verrà sostituita dalla lettera*/

    // cerco indici con "-"
    var betaindex = vettore.map(function(valore, indice){if (valore==0){return indice }});

    while (betaindex.findIndex(function(valore,indice){ return valore == undefined})>-1)
    {
        // è presente almeno un "undefined" (i valori non zero di bits)
        betaindex.map(function(valore,indice){if (valore == undefined){betaindex.splice(indice,1)}});
        // ho eliminato gli "undefined"
    }
    return betaindex[Math.floor(Math.random() * (betaindex.length))]; // restituisco indice casuale
}


function aggiornabits(bits,tentativi)
{
    /*permette l'aggiornamento dell'array bits e del numero di tentativi dell'utente, che
    verranno salvati in un array */
    tentativi = tentativi + 1; // aggiorno tentativi
    let numero = calcolarandom(bits); // determino lettera randomica da aggiungere
    bits[numero]= 1; // aggiorno bits
    return [bits, tentativi];
}



function controlla()
{
/* permette di controllare se la parola inserita dall'utente sia corretta o meno*/
    inserita= $("#insert").val();
    if (inserita.toLowerCase() == parola.toLowerCase())
    {
        /* Parola corretta */
        $("#interazione").empty(); // svuoto e sostituisco contenuto della div
        $("#interazione").append("<button id=\"prosegui\" onclick= \"proseguire()\">Clicca per proseguire</button>");
        $("#frase").empty();
        $("#frase").append("<p>Missione Compiuta!</p>");
    } else if (tentativi == tentativi_max)
    {
        /* Tentativi finiti */
        document.getElementById("suggerimento").innerHTML = parola;
        $("#interazione").empty();
        $("#frase").empty();
        $("#frase").append("<p>Hai terminato i tentativi a disposizione! Clicca per proseguire...</p>");
        $("#interazione").append("<button id=\"prosegui\" onclick= \"proseguire()\">Clicca per proseguire</button>");
    } else
    {
        /* Parola non corretta */
        rslt = aggiornabits(bits,tentativi); // Aggiungo un suggerimento (lettera)
        bits = rslt[0]; tentativi = rslt[1]; // Aggiorno variabili
        incompleta = calcolaincompleta (parola,bits); // Aggiorno Suggerimento
    }
}

window.controlla = controlla

function proseguire()
{
    //  Missione compiuta! vai alla successiva
    saveData.mission_id = saveData.mission_id + 1;
    console.log(saveData);

    localStorage.setItem(`id${saveData.quiz_id}`, JSON.stringify(saveData));

    if(saveData.mission_id != 10)
        window.location.href = `map.html?&id=${saveData.quiz_id}`;
    else
    {
        localStorage.removeItem(`id${saveData.quiz_id}`);
        window.location.href = "fine.html";
    }
}

window.proseguire = proseguire
