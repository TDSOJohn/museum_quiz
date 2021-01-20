//  Using the (new) Fetch API and even newer async() function type to avoid promise chains
//  Support: Chrome 55+, Edge 15+, Firefox 52+, Opera 42+, Safari 10.1+ (no IE support)
//  If not supported, use XMLHttpRequest instead

//  http:ip_address:8000/html/gioco.html?id=n


import * as utilities from './utilities.js';

//  baseURL should be server ip or URL

//  THIS IS FOR UNIBO SERVER TESTING
//const baseURL   = 'giovanni.basso3.tw.cs.unibo.it';

//  THIS IS FOR HOME TESTING
const baseURL   = '127.0.0.1:8000';

let id          = '1';

let counter = -1;
let MyArr, img_personaggio;
let sel_eta = 2;
let myJson = [];
let myJsonParsed = null;


const callAPI   = async () =>
{
//  Build well-formed WHATWG URL and wait for json data
    let myURL       = ('http://' + baseURL +
                                '/?id=' + encodeURIComponent(id));
    console.log(myURL);

    const response  = await fetch(myURL);
    const apiJSON   = await response.json();

    return apiJSON;
}

function updateHTML()
{
    document.getElementById('titolo').innerHTML = `Benvenuto!`;

    counter = counter + 1;
    if (counter > MyArr.benvenuto.length - 1) {
        window.location.href = `/html/map.html?id=${id}`;
    } else {
        document.getElementById('testo').value = MyArr.benvenuto[counter];
    }
}

function updateHTML2() {
    const missionID = localStorage.getItem('mission_id') - 1;
    let missionID_hr = missionID + 1;
    
    document.getElementById('titolo').innerHTML = `Missione ${missionID_hr}`;
    const domanda = myJsonParsed.missioni[missionID].question;

    counter = counter + 1;
    if (counter > domanda.length - 1) {
        if (myJsonParsed.missioni[missionID].type == 'mult_choice') {
            window.location.href = `/html/mult_choice.html?id_missione=${missionID}?id=${id}`;
        } else {
            window.location.href = `/html/impiccato.html?id_missione=${missionID}?id=${id}`;
        }
    } else {
        document.getElementById('testo').value = domanda[counter];
    }
    window.updateHTML = updateHTML2;
}


window.updateHTML = updateHTML;

function loadImg ()
{
    let codice =  `<img src="` + MyArr.immagine + `" id="slide" alt="personaggio" style="box-sizing: border-box;width:37vh;">
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
    if ((localStorage.getItem('First Time') == null) || (!localStorage.getItem('First Time')))
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
    myJson = localStorage.getItem('myJson');
    id = utilities.intParser(utilities.getQueryVariable('id'));

    if(id == null)
        id = 1;

    if(myJson == null)
    {
        callAPI().then(result => {
            MyArr = result;

            localStorage.setItem('myJson', JSON.stringify(MyArr));
            localStorage.setItem('myJsonID', id);
        });
    }
    myJsonParsed = JSON.parse(myJson);
    MyArr = myJsonParsed;

    console.log(MyArr);
    receivedText();
};
