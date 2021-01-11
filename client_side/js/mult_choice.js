var risp = [{
        'testo': '1888',
        'giusta': true
    },
    {
        'testo': '1900',
        'giusta': false
    },
    {
        'testo': '1780',
        'giusta': false
    }
];

window.onload = function() {
    rbs = document.querySelectorAll(".option");
    for (let i = 0; i < rbs.length; ++i) {
        rbs[i].innerHTML = risp[i].testo;
    }
};

//  answer-checking function
function evaluate_answer() {
    let selectedValue;
    for (let i = 0; i < risp.length; i++) {
        if (risp[i].giusta) {
            selectedValue = risp[i].testo;
            break;
        }
    }
    var gg;
    for (let i = 0; i < risp.length; ++i) {
        if (risp[i].testo == selectedValue) {
            gg = risp[i].giusta;
        }
    }
    gg == true ? alert("Missione compiuta") :
        alert("Che peccato, hai sbagliato! Ritenta, questa volta non sbaglierai!");
};
