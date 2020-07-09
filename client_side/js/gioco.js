
var i = -1;
var MyArr, img_personaggio;
var sel_eta = 2;

function loadFile() {
var input, file, fr;
if (typeof window.FileReader !== 'function') {
  alert("The file API isn't supported on this browser yet.");
  return;
}
input = document.getElementById('fileinput');
if (!input) {
  alert("Um, couldn't find the fileinput element.");
}
else if (!input.files) {
  alert("This browser doesn't seem to support the `files` property of file inputs.");
}
else if (!input.files[0]) {
  alert("Please select a file before clicking 'Load'");
}
else {
  file = input.files[0];
  fr = new FileReader();
  fr.onload = receivedText;
  fr.readAsText(file);
}
function receivedText(e) {
  let lines = e.target.result;
  MyArr = lines;
	  updateHTML();
  loadImg();
}
}
function updateHTML() {
  var Arr = JSON.parse(MyArr);
  i = Math.min(i + 1, Arr.gioco[sel_eta].benvenuto.length -1);
  document.getElementById("testo").value = Arr.gioco[sel_eta].benvenuto[i];
}
function loadImg () {
var Arr = JSON.parse(MyArr);
let codice =  `<img src="` + Arr.gioco[sel_eta].immagine + `" id="slide" alt="personaggio" style="box-sizing: border-box;width:37vh;"><style>
      #slide {
        animation-name:slidein;
        animation-duration: 1s;

      }
      @keyframes slidein {
        from {
          margin-left: -100%;
        }
        to {
          margin-left: 0%;
        }
    </style>`
document.getElementById("personaggio").innerHTML=codice;};
