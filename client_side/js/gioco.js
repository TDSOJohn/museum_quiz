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
let id          = '1';

let counter     = -1;
let img_personaggio;
let sel_eta     = 2;
let myJsonParsed= null;


const callAPI   = async () =>
{
//  Build well-formed WHATWG URL and wait for json data
    let myURL       = ('http://' + baseURL +
                                '?id=' + encodeURIComponent(id));
    console.log(myURL);

    const response  = await fetch(myURL);
    const apiJSON   = await response.json();

    return apiJSON;
}


function LSsanityCheck(id_in)
{
    let id_temp         = +localStorage.getItem('myJsonID');
    let json_temp       = +localStorage.getItem('myJson');
    let mission_id_temp = +localStorage.getItem('mission_id');

    if(id_temp == null)
    {
        id_temp = 1;
    }

    if(json_temp == null)
    {

    }
}


function updateHTML()
{
    document.getElementById('titolo').innerHTML = `Benvenuto!`;

    counter = counter + 1;
    if (counter > myJsonParsed.benvenuto.length - 1) {
        window.location.href = `/html/map.html?id=${id}`;
    } else {
        document.getElementById('testo').value = myJsonParsed.benvenuto[counter];
    }
}


function updateHTML2() {
    //  Id della missione in corso (0, ..., 9)
    const missionID = +localStorage.getItem('mission_id');
    //  versione Human-Readable (ordinale partendo da 1)
    let missionID_hr = (missionID + 1);

    document.getElementById('titolo').innerHTML = `Missione ${missionID_hr}`;
    const domanda = myJsonParsed.missioni[missionID].question;

    console.log(myJsonParsed.missioni[missionID].type);
    console.log(missionID);

    counter = counter + 1;
    if (counter > domanda.length - 1) {
        if (myJsonParsed.missioni[missionID].type == 'mult_choice') {
            window.location.href = `/html/mult_choice.html?id=${id}`;
        } else {
            window.location.href = `/html/impiccato.html?id=${id}`;
        }
    } else {
        document.getElementById('testo').value = domanda[counter];
    }
    window.updateHTML = updateHTML2;
}


window.updateHTML = updateHTML;

function loadImg ()
{
    let codice =  `<img src="` + myJsonParsed.immagine + `" id="slide" alt="personaggio" style="box-sizing: border-box;width:37vh;">
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
    if ((localStorage.getItem('First Time') == null) || !(localStorage.getItem('First Time')))
    {
        updateHTML();
        localStorage.setItem('First Time', true);
    } else
    {
        updateHTML2();
    }
    loadImg();
}


window.onload = function()
{
    id = utilities.intParser(utilities.getQueryVariable('id'));

    if(id == null)
        id = 1;

    try
    {
        myJsonParsed = JSON.parse(localStorage.getItem('myJson'));
    } catch (e)
    {
        callAPI().then(result => {
            myJsonParsed = result;

            localStorage.setItem('myJson', JSON.stringify(myJsonParsed));
            localStorage.setItem('myJsonID', id);
        });
    } finally
    {
        if(myJsonParsed == null)
        {
            callAPI().then(result => {
                myJsonParsed = result;

                localStorage.setItem('myJson', JSON.stringify(myJsonParsed));
                localStorage.setItem('myJsonID', id);
            });
        }
    }

    console.log(myJsonParsed);
    receivedText();
};
