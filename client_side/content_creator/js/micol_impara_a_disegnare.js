
const baseURL   = 'http://192.168.2.10:3000';
const templURL  = baseURL + '/content_creator/html/';

var domparser   = new DOMParser();
var xhr         = new XMLHttpRequest();

var htmlContent = "";
var risp = [];
var file;
var json = [];

var body = document.getElementsByTagName('body');
var quiz_quests;

const callAPI = async (myURL) =>
{
    let file = "";

    const response  = await fetch(myURL);
    file            = await response.text();
    return file;
}

function parseTemplate(htmlIn)
{
    let doc = domparser.parseFromString(htmlIn, "text/html");
    var h = doc.getElementsByTagName('span');

    for(let i = 0; i < h.length; i++)
    {
        h[i].innerHTML = risp[i];
    }
    return doc;
}

function showContent(pathToTempl)
{
    quiz_quests = document.querySelectorAll('.quiz_quest');

    if(quiz_quests.length >= 10)
    {
        alert('Hai già selezionato 10 domande! Clicca "Create JSON and Upload" per completare la creazione');
    } else
    {
        var x       = document.getElementById("demo");

        let myURL   = templURL + pathToTempl;
        callAPI(myURL).then(result => {
            htmlContent = result;
            var htmlOut = parseTemplate(htmlContent);
            x.insertAdjacentHTML('beforeend', htmlOut.documentElement.innerHTML);
        });
    }
}

function compileJSON()
{
    var tempArray   = [];
    var tempElement = {};
    var i;
    var j;
    for(i = 0; i < quiz_quests.length; i++)
    {
        tempElement         = {};
        tempArray           = [];
        if(quiz_quests[i].classList.contains('mult_choice'))
        {
            for(j = 1; j < quiz_quests[i].elements.length; j++)
            {
                tempArray.push(quiz_quests[i].elements[j].value);
            }
            tempElement.type    = "mult_choice";
            tempElement.question= quiz_quests[i].elements[0].value;
            tempElement.answers = tempArray;
            json.push(tempElement);
        } else if(quiz_quests[i].classList.contains('hanged_man'))
        {
            tempElement         = {};
            tempElement.type    = "hanged_man";
            tempElement.question= quiz_quests[i].elements[0].value;
            tempElement.answer  = quiz_quests[i].elements[1].value;
            json.push(tempElement);
        }
    }
    alert(JSON.stringify(json));
}

function verifyAndUpload()
{
    quiz_quests   = document.querySelectorAll('.quiz_quest');

    if(quiz_quests.length == 10)
    {
        compileJSON();
        xhr.open("POST", baseURL, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send('{' + JSON.stringify(json) + '}');

        xhr.onreadystatechange = function ()
        {
            if (xhr.readyState === 4 && xhr.status === 200)
            {
                console.log("file sent!");
                body[0].innerHTML = `<img src=\"${xhr.responseURL}\">`;
            }
        }
    } else
    {
        alert('inserisci ancora ' +
                (10 - quiz_quests.length) +
                ' domande per completare il quiz');
    }
}


var questionTypes;

window.onload = function() {
    questionTypes   = document.querySelectorAll('.questType');
    etaTypes        = document.querySelectorAll('.etaType');

    questionTypes[0].addEventListener('click', function() { showContent('mult_choice_templ.html'); });
    questionTypes[1].addEventListener('click', function() { showContent('hanged_man_templ.html'); });
};
