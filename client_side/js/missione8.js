const srt = document.querySelector('#srt');
srt.onclick = function() {


    var dop = document.getElementById("quadri").value;

    if (dop == "Ricerca di equilibrio") {
        alert("missione compiuta")
    } else {
        alert("Che peccato hai sbagliato! Ritenta, questa volta non sbaglierai!")
    }
}