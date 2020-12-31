//  Using the (new) Fetch API and even newer async() function type to avoid promise chains
//  Support: Chrome 55+, Edge 15+, Firefox 52+, Opera 42+, Safari 10.1+ (no IE support)
//  If not supported, use XMLHttpRequest instead

//  baseURL should be RESTful API ip
const baseURL   = '192.168.1.157';
const apiPort   = '3000';
var id          = '1';

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
    var query   = window.location.search.substring(1);
    var vars    = query.split('&');
    for (var i  = 0; i < vars.length; i++)
    {
        var pair= vars[i].split('=');
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
    const apiJSON   = await response.json();

    return apiJSON;

/*    const hrJSON    = JSON.stringify(apiJSON);

    document.getElementById("this_p").innerHTML = hrJSON;*/
}
/*
id = intParser(getQueryVariable('id'));

callAPI();
*/
export { id, intParser, getQueryVariable, callAPI };
