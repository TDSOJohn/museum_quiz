//  Using the (new) Fetch API and even newer async() function type to avoid promise chains
//  Support: Chrome 55+, Edge 15+, Firefox 52+, Opera 42+, Safari 10.1+ (no IE support)
//  If not supported, use XMLHttpRequest instead

const baseURL   = '192.168.1.110';
const apiPort   = '3000';
var id          = '1';

const callAPI   = async () =>
{
//  Build well-formed WHATWG URL and wait for json data
    let myURL       = 'http://' + baseURL + ':' + apiPort + '/&id=' + id;
    alert(myURL);

    const response  = await fetch(myURL);
    const apiJSON   = await response.json();

    document.getElementById("this_p").innerHTML = apiJSON;
}

callAPI();
