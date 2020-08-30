//  Using the (new) Fetch API and even newer async() function type to avoid promise chains
//  Support: Chrome 55+, Edge 15+, Firefox 52+, Opera 42+, Safari 10.1+ (no IE support)
//  If not supported, use XMLHttpRequest instead

import * as utilities from './utilities.js';

//  baseURL should be RESTful API ip
//const baseURL   = '192.168.1.157';
const baseURL   = '127.0.0.1';

const apiPort   = '3000';
var id          = '1';

const callAPI   = async () =>
{
//  Build well-formed WHATWG URL and wait for json data
    let myURL       = ('http://' + encodeURIComponent(baseURL) +
                                ':' + encodeURIComponent(apiPort) +
                                '/?id=' + encodeURIComponent(id)) +
                                '&type=json';

    const response  = await fetch(myURL);
    const apiJSON   = await response.json();

    return apiJSON;
}

var i = -1;

var MyArr, img_personaggio, frasi;

async function loadFile() {
    id = utilities.intParser(utilities.getQueryVariable('id'));
    MyArr = await callAPI();

    updateHTML();
    loadImg();
}


function updateHTML() {
    i = Math.min(i + 1, MyArr.missioni[0].length -1);
    frasi = MyArr.missioni[i];
    document.getElementById("testo").value = frasi[i];
}

 function loadImg () {
    let codice =  `<img src="../images/` + MyArr.immagine + `" id="slide" alt="personaggio" style="box-sizing: border-box;width:37vh;"><style>
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
        </style>`
    document.getElementById("personaggio").innerHTML = codice;
}

//  Using type="module" in the HTML document creates a different scope to avoid name collisions
//  This code is used to expose functions to the window object
window.loadFile     = loadFile;
window.updateHTML   = updateHTML;
