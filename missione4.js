const srt = document.querySelector('#srt');
srt.onclick = function() {


    var dop = document.getElementById("quadri").value;

    if (dop == "73x58cm") {
        alert("Missione compiuta!!")
    } else {
        alert("Che peccato hai sbagliato!Ritenta, questa volta non sbaglierai!")
    }
};