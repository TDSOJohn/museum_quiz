
//  THIS IS FOR UNIBO SERVER TESTING
const baseURL       = 'http://giovanni.basso3.tw.cs.unibo.it/';

//  THIS IS FOR HOME TESTING
//const baseURL       = '127.0.0.1:8000/';


const htmlTemplURL  = baseURL + 'content_creator/html/';
const jsonTemplURL  = baseURL + 'content_creator/json/';

var domparser       = new DOMParser();
var xhr             = new XMLHttpRequest();

var htmlContent     = "";
var risp            = [];
var file;
var template_json   = [];

var body            = document.getElementsByTagName('body');
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

    //  check if number of questions is already 10, otherwise retrieve template from server
    if(quiz_quests.length >= 10)
    {
        alert('Hai già selezionato 10 domande! Clicca "Create JSON and Upload" per completare la creazione');
    } else
    {
        var x       = document.getElementById("demo");

        let myURL   = htmlTemplURL + pathToTempl;

        callAPI(myURL).then(result => {
            htmlContent = result;
            var htmlOut = parseTemplate(htmlContent);
            x.insertAdjacentHTML('beforeend', htmlOut.documentElement.innerHTML);
        });
    }
}


function getJSONTemplate(pathToTempl)
{
    let myURL = jsonTemplURL + pathToTempl;

    callAPI(myURL).then(result => {
        template_json = JSON.parse(result);
    });
}


function compileJSON()
{
    var i;
    var j;

    //  Cycle through every question, compile JSON template using data from user
    for(i = 0; i < quiz_quests.length; i++)
    {
        if(quiz_quests[i].classList.contains('mult_choice'))
        {
            for(j = 1; j < quiz_quests[i].elements.length; j++)
            {
                template_json.missioni[i].answers.push(quiz_quests[i].elements[j].value);
            }
            template_json.missioni[i].type          = "mult_choice";
            template_json.missioni[i].question[4]   = quiz_quests[i].elements[0].value;
        } else if(quiz_quests[i].classList.contains('hanged_man'))
        {
            template_json.missioni[i].type          = "hanged_man";
            template_json.missioni[i].question[4]   = quiz_quests[i].elements[0].value;
            template_json.missioni[i].answers.push(quiz_quests[i].elements[1].value);
        }
    }
    alert(JSON.stringify(template_json));
}


function verifyAndUpload()
{
    //  if template is == [] then age is not selected
    if(template_json == [])
    {
        alert('Devi ancora selezionare l\'età!');
    } else
    {
        quiz_quests   = document.querySelectorAll('.quiz_quest');

        if(quiz_quests.length == 10)
        {
            compileJSON();
            xhr.open("POST", baseURL, true);
            xhr.setRequestHeader("Content-Type", "application/json");

            xhr.send(JSON.stringify(template_json));

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
}


var questionTypes;
var etaTypes;


window.onload = function() {
    questionTypes   = document.querySelectorAll('.questType');
    etaTypes        = document.querySelectorAll('.etaType');

    questionTypes[0].addEventListener('click', function() { showContent('mult_choice_templ.html'); });
    questionTypes[1].addEventListener('click', function() { showContent('hanged_man_templ.html'); });
    questionTypes[2].addEventListener('click', function() { showContent('image_upload_templ.html'); });

    for(let i = 0; i < etaTypes.length; i++)
    {
        etaTypes[i].addEventListener('click', function()
        {
            getJSONTemplate(`template${i}.json`);
            etaTypes[i].style.color = 'red';
        });
    }
};
