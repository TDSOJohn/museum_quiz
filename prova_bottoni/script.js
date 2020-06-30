/* I valori iniziali dei bottoni */
function valoriIniziali() {
  localStorage.setItem("btn1", "nessunaclasse");
  localStorage.setItem("btn2", "disabled");
  localStorage.setItem("btn3", "disabled");
  localStorage.setItem("btn4", "disabled");
  localStorage.setItem("btn5", "disabled");
  localStorage.setItem("btn6", "disabled");
  localStorage.setItem("btn7", "disabled");
  localStorage.setItem("btn8", "disabled");
  localStorage.setItem("btn9", "disabled");
  localStorage.setItem("btn10", "disabled");
}
/* set the state of the Buttons */
function setValues() {
  $(".btn1").addClass(localStorage.getItem("btn1"));
  $(".btn2").addClass(localStorage.getItem("btn2"));
  $(".btn3").addClass(localStorage.getItem("btn3"));
  $(".btn4").addClass(localStorage.getItem("btn4"));
  $(".btn5").addClass(localStorage.getItem("btn5"));
  $(".btn6").addClass(localStorage.getItem("btn6"));
  $(".btn7").addClass(localStorage.getItem("btn7"));
  $(".btn8").addClass(localStorage.getItem("btn8"));
  $(".btn9").addClass(localStorage.getItem("btn9"));
  $(".btn10").addClass(localStorage.getItem("btn10"));
}
if (!localStorage.getItem("btn1")) {
  valoriIniziali();
  setValues();
} else {
  setValues();
}

$(function () {
  $(".btn1").click(function () {
    localStorage.removeItem("btn1");
    localStorage.removeItem("btn2");
    localStorage.setItem("btn1", "disabled");
    localStorage.setItem("btn2", "");
    $(".btn1").addClass(localStorage.getItem("btn1"));
    $(".btn2").removeClass("disabled");
  });
  $(".btn2").click(function () {
    localStorage.removeItem("btn2");
    localStorage.removeItem("btn3");
    localStorage.setItem("btn2", "disabled");
    localStorage.setItem("btn3", "");
    $(".btn2").addClass(localStorage.getItem("btn2"));
    $(".btn3").removeClass("disabled");
  });
  $(".btn3").click(function () {
    localStorage.removeItem("btn3");
    localStorage.removeItem("btn4");
    localStorage.setItem("btn3", "disabled");
    localStorage.setItem("btn4", "");
    $(".btn3").addClass(localStorage.getItem("btn3"));
    $(".btn4").removeClass("disabled");
  });
  $(".btn4").click(function () {
    localStorage.removeItem("btn4");
    localStorage.removeItem("btn5");
    localStorage.setItem("btn4", "disabled");
    localStorage.setItem("btn5", "");
    $(".btn4").addClass(localStorage.getItem("btn4"));
    $(".btn5").removeClass("disabled");
  });
  $(".btn5").click(function () {
    localStorage.removeItem("btn5");
    localStorage.removeItem("btn6");
    localStorage.setItem("btn5", "disabled");
    localStorage.setItem("btn6", "");
    $(".btn5").addClass(localStorage.getItem("btn5"));
    $(".btn6").removeClass("disabled");
  });
  $(".btn6").click(function () {
    localStorage.removeItem("btn6");
    localStorage.removeItem("btn7");
    localStorage.setItem("btn6", "disabled");
    localStorage.setItem("btn7", "");
    $(".btn6").addClass(localStorage.getItem("btn6"));
    $(".btn7").removeClass("disabled");
  });
  $(".btn7").click(function () {
    localStorage.removeItem("btn7");
    localStorage.removeItem("btn8");
    localStorage.setItem("btn7", "disabled");
    localStorage.setItem("btn8", "");
    $(".btn7").addClass(localStorage.getItem("btn7"));
    $(".btn8").removeClass("disabled");
  });
  $(".btn8").click(function () {
    localStorage.removeItem("btn8");
    localStorage.removeItem("btn9");
    localStorage.setItem("btn8", "disabled");
    localStorage.setItem("btn9", "");
    $(".btn8").addClass(localStorage.getItem("btn8"));
    $(".btn9").removeClass("disabled");
  });
  $(".btn9").click(function () {
    localStorage.removeItem("btn9");
    localStorage.removeItem("btn10");
    localStorage.setItem("btn9", "disabled");
    localStorage.setItem("btn10", "");
    $(".btn9").addClass(localStorage.getItem("btn9"));
    $(".btn10").removeClass("disabled");
  });
  $(".btn10").click(function () {
    localStorage.removeItem("btn10");
    localStorage.setItem("btn10", "disabled");
    $(".btn1").addClass(localStorage.getItem("btn10"));
  });
});
