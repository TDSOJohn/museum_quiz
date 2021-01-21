
const missionID     = localStorage.getItem('mission_id');
const myJsonParsed  = JSON.parse(localStorage.getItem('myJson'));
const myJsonID      = localStorage.getItem('myJsonID');
const risp          = myJsonParsed.missioni[missionID].answers;
const domanda = myJsonParsed.missioni[missionID].question[4];

const corretta = risp[0] // la risposta corretta è sempre la prima nel JSON

// Creo sequenza randomica
var arr = [];
while(arr.length < risp.length){
    var r = Math.floor(Math.random() * risp.length);
    if(arr.indexOf(r) === -1) {
        arr.push(r);}
}
console.log(arr);

window.onload = function () {
    document.getElementById("frase").innerText = domanda;
    rbs = document.querySelectorAll(".option");
    for (let i = 0; i < rbs.length; ++i) {
        // scrivo le opzioni nell'html in posizioni casuali
        document.getElementById("opt"+i).innerText = risp[arr[i]];
    }
};


//  answer-checking function
function evaluate_answer() {
    var ele = document.getElementsByName("optradio");
    var sel = ''
    for (i=0; i<ele.length; i++) {
        if(ele[i].checked) {
            sel = document.getElementById("opt"+i).innerText;
            sel_parent = document.getElementById("opt"+i);
            console.log(sel)
        }
    }
    if (sel == corretta) {
        $("#interazione").empty()
        $("#frase").empty();
        $("#frase").append("<p>Missione Compiuta!</p>");
        $("#interazione").append("<button id=\"prosegui\" onclick= \"prosegui()\"  style=\"font-size: 3vh;font-family: cursive; border-radius:20px; text-align: center;\">Clicca per proseguire</button>")
    } else {
        sel_parent.style.color = 'red';
        $("#alert").empty();
        $("#alert").append("<p>Che peccato, hai sbagliato! Ritenta, questa volta non sbaglierai!</p>");
    }

};

function prosegui() {
    if(missionID != 9)
        window.location.href = `map.html?&id=${myJsonID}`
    else
        window.location.href = "fine.html"
}
