var file        = '{"missioni":[ ["ARRR! Benvenuta a bordo, piccola ciurma! Siamo in 5 nel nostro equipaggio!", " Io sono Cippy, il miglior pappagallo pirata sulla terra, per tutti i bucanieri!", "Devo trovare il tesoro che il pirata Azzurro ha nascosto su un isola in mezzo al mare!", "Tu e i tuoi compagni mi aiuterete in questa avventura?", "Corpo di mille balene! STRABILIANTE! Tu sei il pirata che mi mancava!", "Per non creare guazzabugli, vi accompagnerò e vi darò suggerimenti per acciuffare il bottino!", "ALL\'ARREMBAGGIO, PIRATI!!!"], ["ARRR! Piccola ciurma, dobbiamo cercare il nostro tesoro", "Il nostro amico Cippy, volando nella nave del Pirata Azzurro, ha scoperto che si tratta di un quadro preziosissimo, con tre grandi fiori gialli!", "(lo dirò solo a voi, piccola e coraggiosa ciurma, sono fatti d\'oro!!!)", "Miei piccoli pirati, dovrete prima trovare un altro quadro però!", "Ha tre donne velate di spalle al suo interno...trovatelo, miei fidati PIRATI e ditemi l\'anno in cui è stato fatto", "Corpo di mille balene!!! è lo stesso anno del quadro che noi stiamo cercando!" , "ANDATE E NON FATEMI ATTENDERE! ALL\'ARREMBAGGIO!"], ["Per la benda di Barbanera! Siete stati velocissimi, più veloci dei fulmini delle tempeste di mare!!!", "ARRR! Ora dovete dirmi il nome del pirata che ha creato il quadro che avete appena scovato!", "Cippy ha scoperto delle lettere del suo nome...", "Se lo chiamate, vi aiuterà lui!", "Ricordatevi, mia piccola ciurma, che non dobbiamo farci sentire dagli altri pirati!!!", "FATE MOLTA ATTENZIONE! Ci sono pirati cattivi lì fuori...", "Cercate il  nome, ma non fatevi sentire!!!"], ["AHOY! SIETE STRABILIANTI! DEI PIRATI UNICI!", "Per continuare la ricerca del nostro bottino, dobbiamo cercare un altro quadro!", "Vi lascio il mio cannocchiale... è PREZIOSISSIMO", "con questo potrete vedere facilmente lo sfondo del quadro fatt dal pirata MONET...", "al suo interno ha una grande spiaggia...", "ricordatevi...abbiamo bisogno del colore dello sfondo, piccola ciurma!", "FATE ATTENZIONE e usate il cannocchiale...!"], ["Il bottino deve entrare nella nostra nave!!!", "siete sicuri che non sia troppo grande?", "Cippy mi ha detto che il quadro che avete appena trovato ha le stesse dimensioni!", "Il mio cannocchiale magico vi permetterà di scovare anche quelle...", "LEGGETE OGNI DETTAGLIO...Cippy vi aiuterà", "quando siete sicuri delle dimensioni, venite da me e ditemele!", "ALL\'ARREMBAGGIO!!!"], ["SIETE LA MIGLIOR CIURMA DI SEMPRE!", "Vi ricordate bene qual è il nostro obiettivo, vero?", "Dobbiamo trovare il quadro con i tre fiori gialli!", "Cippy ha detto che è stato fatto con l\'antica tecnica della Pittura ad Olio...lo rende ancora più prezioso!", "Corpo di mille balene! Dovete cercare un quadro con la stessa tecnica...", "Vi darò un indizio...il pirata che l\'ha scoperto è HENRI MATISSE e l\'anno è il 1907...", "ha una grande figura blu, sapete dirmi il titolo?"], ["Bravissimi, piccoli pirati!", "Ora dovete dirmi cosa è la figura blu al centro del quadro...", "Cippy mi ha detto che assomiglia ad uno squalo...", "Io però non ci credo... mi fido più di voi...", "è davvero uno squalo?", "oppure è un oggetto?", "datemi la risposta, CIURMA!!!" ], ["A tutti i pirati piacciono i colori...", "...ma a voi piacciono TANTISSIMO!", "Cippy ha scoperto una cosa...", "il pirata che ha fatto il quadro con i FIORI GIALLI viene dalla stessa terra di un altro pirata", "NON SAPPIAMO IL NOME, ARRR!!!", "però... conosciamo un suo quadro! Si chiama Composizione in rosso, blu e... GIALLO!", "Trovatelo, ditemi da dove viene il pirata!!!"], ["MAH... che quadro strano, piccoli pirati!", "non capisco cosa rappresenta...", "non sono fiori, non sono cannocchiali, non sono oggetti quelli!!!", "io vi lascio il mio cannocchiale magico...", "riuscite a capire quale di questi tre è il significato del quadro?", "Cippy non si ricorda più quale è quello giusto!!!", "povero Cippy... sta invecchiando anche lui... aiutatemi voi!" ], ["Il pirata che ha fatto il quadro che vogliamo trovare è molto conosciuto...", "... per tutti i mari e su tutte le navi i pirati parlano di lui!", "Sappiamo che ha fatto anche questo quadro...", "si chiama Notte Stellata...", "ARRRRRR pirati!!! Una notte stellata come questa è perfetta per cercarlo!!!", "Se lo trovate... ABBIAMO IL NOME DEL PIRATA CHE CERCHIAMO!!!", "Andate ciurma, conto su di voi per scoprire il suo nome!!!" ], ["SIAMO GIUNTI ALLA FINE DEL NOSTRO VIAGGIO!", "Abbiamo raccolto tantissime informazioni...", "Il quadro ha tre grandi fiori gialli, è del 1888, è giusto per la nostra nave, misura solo 73x58cm...", "... è fatto con la pittura ad olio, il pirata è OLANDESE, sappiamo anche il suo nome...", "... mi mette i brividi... VINCENT VAN GOGH!", "CIURMA!!! Sta a voi ora cercare il nostro TESORO!!!", "CE LA FARETE, NE SONO SICURO!!!"] ], "immagine": "cippy.png" } ';

const baseURL   = 'http://127.0.0.1:3000';
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
    var x = document.getElementById("demo");

    let myURL = templURL + pathToTempl;
    callAPI(myURL).then(result => {
        htmlContent = result;
        var htmlOut = parseTemplate(htmlContent);
        x.insertAdjacentHTML('beforeend', htmlOut.documentElement.innerHTML);
    });
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
    questionTypes = document.querySelectorAll('.questType');

    questionTypes[0].addEventListener('click', function() { showContent('mult_choice_templ.html'); });
    questionTypes[1].addEventListener('click', function() { showContent('hanged_man_templ.html'); });
};
