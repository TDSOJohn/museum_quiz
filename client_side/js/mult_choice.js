
import * as utilities from './utilities.js';

let saveData = new Object;
let missionID;
let risp, domanda, corretta;
let rbs;


window.onload = function()
{
    saveData            = utilities.LSsanityCheck();
    missionID           = saveData.mission_id;

    risp                = saveData.json.missioni[missionID].answers;
    domanda             = saveData.json.missioni[missionID].question[4];

    corretta            = risp[0]; // la risposta corretta è sempre la prima nel JSON

    // Creo sequenza randomica
    var arr = [];
    while(arr.length < risp.length)
    {
        var r = Math.floor(Math.random() * risp.length);
        if(arr.indexOf(r) === -1) {
            arr.push(r);}
    }
    console.log(arr);

    document.getElementById("frase").innerText = domanda;
    document.getElementById("main_form").setAttribute('title', domanda);

    rbs = document.querySelectorAll(".option");
    for (let i = 0; i < rbs.length; ++i)
    {
        // scrivo le opzioni nell'html in posizioni casuali
        document.getElementById("opt"+i).innerText = risp[arr[i]];
    }

    document.addEventListener("keyup", event =>
    {
        if(event.key !== "Enter") return;
        document.getElementById('btn').click();
    });
};


//  answer-checking function
function evaluate_answer()
{
    var ele = document.getElementsByName("optradio");
    var sel = '';
    var sel_parent;
    for (let i = 0; i < ele.length; i++)
    {
        if(ele[i].checked)
        {
            sel = document.getElementById("opt"+i).innerText;
            sel_parent = document.getElementById("opt"+i);
            console.log(sel);
        }
    }
    if (sel == corretta)
    {
        $("#interazione").empty();
        $("#frase").empty();
        $("#frase").append("<p>Missione Compiuta!</p>");
        $("#interazione").append("<button id=\"prosegui\" onclick= \"prosegui()\" autofocus=\"autofocus\" title=\"Complimenti, hai completato la missione\" style=\"font-size: 3vh;font-family: cursive; border-radius:20px; text-align: center;\">Clicca per proseguire</button>")
    } else
    {
        sel_parent.setAttribute('title', 'questa risposta è purtroppo sbagliata');
        sel_parent.style.color = 'red';
        $("#alert").empty();
        $("#alert").append("<p>Che peccato, hai sbagliato! Ritenta, questa volta non sbaglierai!</p>");
    }
};

window.evaluate_answer = evaluate_answer

function prosegui()
{
    //  Missione compiuta! vai alla successiva
    saveData.mission_id = saveData.mission_id + 1;
    console.log(saveData);

    localStorage.setItem(`id${saveData.quiz_id}`, JSON.stringify(saveData));

    if(saveData.mission_id != 10)
        window.location.href = `map.html?&id=${saveData.quiz_id}`;
    else
    {
        localStorage.removeItem(`id${saveData.quiz_id}`);
        window.location.href = "fine.html";
    }
}

window.prosegui = prosegui
