//  Using the (new) Fetch API and even newer async() function type to avoid promise chains
//  Support: Chrome 55+, Edge 15+, Firefox 52+, Opera 42+, Safari 10.1+ (no IE support)
//  If not supported, use XMLHttpRequest instead

//  http:ip_address:8000/html/gioco.html?id=n


import * as utilities from './utilities.js';

//  baseURL should be server ip or URL

//  THIS IS FOR UNIBO SERVER TESTING
const baseURL   = 'giovanni.basso3.tw.cs.unibo.it';

//  THIS IS FOR HOME TESTING
//const baseURL   = '127.0.0.1:8000';

//  Stores quiz id
let saveData   = new Object;

let counter     = -1;


const callAPI   = async () =>
{
//  Build well-formed WHATWG URL and wait for json data
    let myURL       = ('http://' + baseURL +
                                '?id=' + encodeURIComponent(saveData.quiz_id));
    console.log(myURL);

    const response  = await fetch(myURL);
    const apiJSON   = await response.json();

    return apiJSON;
}


function updateHTML()
{
    document.getElementById('titolo').innerHTML = `Benvenuto!`;

    counter = counter + 1;
    if (counter > saveData.json.benvenuto.length - 1) {
        localStorage.setItem(`id${saveData.quiz_id}`, JSON.stringify(saveData));
        window.location.href = `/html/map.html?id=${saveData.quiz_id}`;
    } else {
        document.getElementById('testo').value = saveData.json.benvenuto[counter];
    }
}


function updateHTML2() {
    //  Id della missione in corso (0, ..., 9)
    const missionID = saveData.mission_id;
    //  versione Human-Readable (ordinale partendo da 1)
    let missionID_hr = (missionID + 1);

    document.getElementById('titolo').innerHTML = `Missione ${missionID_hr}`;
    const domanda = saveData.json.missioni[missionID].question;

    counter = counter + 1;
    if (counter > domanda.length - 1) {
        if (saveData.json.missioni[missionID].type == 'mult_choice') {
            window.location.href = `/html/mult_choice.html?id=${saveData.quiz_id}`;
        } else {
            window.location.href = `/html/impiccato.html?id=${saveData.quiz_id}`;
        }
    } else {
        document.getElementById('testo').value = domanda[counter];
    }
    window.updateHTML = updateHTML2;
}


window.updateHTML = updateHTML;

function loadImg ()
{
    let codice =  `<img src="` + saveData.json.immagine + `" id="slide" alt="personaggio" style="box-sizing: border-box;width:37vh;">
    <style>
        #slide {
            animation-name:slidein;
            animation-duration: 1s;
        }
        @keyframes slidein {
            from {
                margin-left: -100%;
            }
            to {
                margin-left: 0%;
            }
        }
        </style>`
    document.getElementById("personaggio").innerHTML = codice;
}


function receivedText()
{
    if((saveData.first_time == true))
    {
        console.log("First Time here!");
        updateHTML();
        saveData.first_time = false;
    } else
    {
        updateHTML2();
    }
    loadImg();
}


window.onload = function()
{
    saveData       = utilities.LSsanityCheck();

    console.log(saveData.json);
    if((saveData.json == null) || (saveData.json == undefined))
    {
        callAPI().then(result =>
        {
            console.log(result);
            saveData.json = result;
            localStorage.setItem(`id${saveData.quiz_id}`, JSON.stringify(saveData));
            receivedText();
        });
    } else
        receivedText();

    console.log(saveData);

    localStorage.setItem(`id${saveData.quiz_id}`, JSON.stringify(saveData));
};
