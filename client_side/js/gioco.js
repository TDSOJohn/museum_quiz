//  Using the (new) Fetch API and even newer async() function type to avoid promise chains
//  Support: Chrome 55+, Edge 15+, Firefox 52+, Opera 42+, Safari 10.1+ (no IE support)
//  If not supported, use XMLHttpRequest instead

//  http:ip_address:3000/html/gioco.html?id=n


import * as utilities from './utilities.js';

//  baseURL should be server ip
const baseURL   = 'giovanni.basso3.tw.cs.unibo.it';
const apiPort   = '8000';
let id          = '1';

let i = -1;
let MyArr, img_personaggio;
let sel_eta = 2;

const callAPI   = async () =>
{
//  Build well-formed WHATWG URL and wait for json data
    let myURL       = ('http://' + encodeURIComponent(baseURL) +
                                ':' + encodeURIComponent(apiPort) +
                                '?id=' + encodeURIComponent(id));
    console.log(myURL);

    const response  = await fetch(myURL);
    const apiJSON   = await response.json();

    return apiJSON;
}

function updateHTML()
{
    i = i + 1
    if (i > MyArr.benvenuto.length - 1) {
        window.location.href = `/html/map.html?id=${id}`;
    } else {
        document.getElementById("testo").value = MyArr.benvenuto[i];
    }
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
    updateHTML();
    loadImg();
}

window.onload = function()
{
    id = utilities.intParser(utilities.getQueryVariable('id'));
    callAPI().then(result => {
        MyArr = result;
        receivedText();
    });
    console.log(MyArr);
}
