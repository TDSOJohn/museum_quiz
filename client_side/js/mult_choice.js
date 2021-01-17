function intParser(string_in) {
    const parsed = parseInt(string_in, 10);
    if (isNaN(parsed) && (parsed !== null)) {
        return 1;
    }
    return parsed;
}
function getQueryVariable(variable_in) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable_in) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable_in);
}
const missionID = intParser(getQueryVariable('id_missione'));
console.log('ID della mission', missionID)
// var risp = [{
//     'testo': '1888',
//     'giusta': true
// },
// {
//     'testo': '1900',
//     'giusta': false
// },
// {
//     'testo': '1780',
//     'giusta': false
// }
// ];
const myJson = localStorage.getItem('myJson')
const myJsonParsed = JSON.parse(myJson)
const myJsonID = localStorage.getItem('myJsonID')
const risp = myJsonParsed.missioni[missionID].answers
window.onload = function () {
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
function prosegui() {
    window.location.href = `map.html?&id=${myJsonID}`
}
