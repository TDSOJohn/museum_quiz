var risposte = ["1888", "donna"]; //risposte corrette della missione 1 e 5
var risposte_errate = ["1900", "1780", "squalo", "gatto"]; //risposte sbagliate delle rispettive missioni
var parola = risposte[0];
var par_err1 = risposte_errate[0];
var par_err2 = risposte_errate[1];
var rbs = [];

window.onload = function() {
    console.log("loaded!");
    rbs = document.querySelectorAll("label");
    for(let i = 0; i < rbs.length; ++i)
    {
        rbs[i].innerHTML = "<input type=\"radio\" name=\"optradio\" checked>" + risposte_errate[i];
    }
};

//  answer-checking function
function evaluate_answer() {
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }
    if (selectedValue == parola) {
        alert("Missione compiuta");
    } else {
        alert("Che peccato hai sbagliato!Ritenta, questa volta non sbaglierai!");
    }

};
