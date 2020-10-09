//  Using the (new) Fetch API and even newer async() function type to avoid promise chains
//  Support: Chrome 55+, Edge 15+, Firefox 52+, Opera 42+, Safari 10.1+ (no IE support)
//  If not supported, use XMLHttpRequest instead

//  baseURL should be server ip
const baseURL   = '127.0.0.1';
const apiPort   = '3000';
var id          = '1';

var i = -1;
var MyArr, img_personaggio;
var sel_eta = 2;
var file;

//  Sanitizes string_in checking for ints. Warning: 11fxoifS => 11, a11b => NaN
function intParser(string_in)
{
    const parsed = parseInt(string_in, 10);
    if(isNaN(parsed) && (parsed !== null))
    {
        return -1;
    }
    return parsed;
}

function getQueryVariable(variable)
{
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++)
    {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable)
        {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

const callAPI   = async () =>
{
//  Build well-formed WHATWG URL and wait for json data
    let myURL       = ('http://' + encodeURIComponent(baseURL) +
                                ':' + encodeURIComponent(apiPort) +
                                '/?id=' + encodeURIComponent(id));
    alert(myURL);

    const response  = await fetch(myURL);
    file            = await response.json();
    MyArr = file;
    alert(file);
}

id = intParser(getQueryVariable('id'));

callAPI();

function receivedText(e)
{
    let lines = e.target.result;
    MyArr = lines;
    updateHTML();
    loadImg();
}

function updateHTML()
{
    i++;
    if(i < MyArr.missioni[0].length)
    {
        // update "benvenuto" text
        document.getElementById("testo").value = MyArr.missioni[0][i];
    } else
    {
        // redirect to map.html
        window.location.replace('../html/map.html');
    }
}

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
};
