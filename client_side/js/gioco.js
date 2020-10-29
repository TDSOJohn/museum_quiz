//  Using the (new) Fetch API and even newer async() function type to avoid promise chains
//  Support: Chrome 55+, Edge 15+, Firefox 52+, Opera 42+, Safari 10.1+ (no IE support)
//  If not supported, use XMLHttpRequest instead

import * as utilities from './utilities.js';

//  baseURL should be server ip
const baseURL   = '192.168.1.110';
const apiPort   = '3000';
let id          = '1';

let i = -1;
let MyArr, img_personaggio;
let sel_eta = 2;

const callAPI   = async () =>
{
//  Build well-formed WHATWG URL and wait for json data
    let myURL       = ('http://' + encodeURIComponent(baseURL) +
                                ':' + encodeURIComponent(apiPort) +
                                '/?id=' + encodeURIComponent(id));
    alert(myURL);

    const file = fetch(myURL).then((response) => {
        const file  = response;
        console.log(file);
        return file;
    }).catch(err => {
        alert(err);
    });
}

function receivedText(e)
{
    let lines = e.target.result;
    MyArr = lines;
    updateHTML();
    loadImg();
}

var frasi;

function updateHTML()
{
    frasi = MyArr.missioni[3];
    i = Math.min(i + 1, MyArr.missioni[0].length - 1);
    document.getElementById("testo").value = frasi[i];
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
    document.getElementById("personaggio").innerHTML=codice;
}


window.onload = function() {
    id = utilities.intParser(utilities.getQueryVariable('id'));
    MyArr = callAPI();
    console.log(MyArr);
}
