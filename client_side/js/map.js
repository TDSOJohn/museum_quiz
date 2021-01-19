function precarica(img) {
    $(img).each(function () {
        $('<img/>')[0].src = this;
    });
}
precarica([
    '../images/grotta_dell_uncino.jpg',
    '../images/lago_senza_nome.jpg',
    '../images/fiume_azzurro.jpg',
    '../images/montagne_del_morto.jpg',
    '../images/passo_dell_impiccato.jpg',
    '../images/sabbie_mobili.jpg',
    '../images/foresta_buia.jpg',
    '../images/montagna_del_fuoco.jpg',
    '../images/deserto_dei_serpenti.jpg',
    '../images/tesoro.jpg'
]);

/*******jQuery for external title*********/

let map_image = getElementById('pirate_map');

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

$(function () {

    const myJson = localStorage.getItem('myJson')
    const myJsonParsed = JSON.parse(myJson)
    const myJsonID = localStorage.getItem('myJsonID')
    console.log(myJsonParsed.missioni[0].type)
    if (!localStorage.getItem("btn1")) {
        valoriIniziali();
        setValues();
    } else {
        setValues();
    }

    $(".btn1").click(function () {

        localStorage.removeItem("btn1");
        localStorage.removeItem("btn2");
        localStorage.setItem("btn1", "disabled");
        localStorage.setItem("btn2", "");
        $(".btn1").addClass(localStorage.getItem("btn1"));
        $(".btn2").removeClass("disabled");

        //  Set new map image with correct red selection
        map_image.setAttribute("xlink:href", "../images/map_1.jpg");

        if (myJsonParsed.missioni[0].type == "mult_choice") {
            window.location.href = `mult_choice.html?id_missione=0?&id=${myJsonID}`
        } else {
            window.location.href = `impiccato.html?id_missione=0?&id=${myJsonID}`
        }
    });

    $(".btn2").click(function () {
        localStorage.removeItem("btn2");
        localStorage.removeItem("btn3");
        localStorage.setItem("btn2", "disabled");
        localStorage.setItem("btn3", "");
        $(".btn2").addClass(localStorage.getItem("btn2"));
        $(".btn3").removeClass("disabled");

        //  Set new map image with correct red selection
        map_image.setAttribute("xlink:href", "../images/map_2.jpg");

        if (myJsonParsed.missioni[1].type == "mult_choice") {
            window.location.href = `mult_choice.html?id_missione=1?&id=${myJsonID}`
        } else {
            window.location.href = `impiccato.html?id_missione=1?&id=${myJsonID}`
        }
    });

    $(".btn3").click(function () {
        localStorage.removeItem("btn3");
        localStorage.removeItem("btn4");
        localStorage.setItem("btn3", "disabled");
        localStorage.setItem("btn4", "");
        $(".btn3").addClass(localStorage.getItem("btn3"));
        $(".btn4").removeClass("disabled");

        //  Set new map image with correct red selection
        map_image.setAttribute("xlink:href", "../images/map_3.jpg");

        if (myJsonParsed.missioni[2].type == "mult_choice") {
            window.location.href = `mult_choice.html?id_missione=2?&id=${myJsonID}`
        } else {
            window.location.href = `impiccato.html?id_missione=2?&id=${myJsonID}`
        }
    });

    $(".btn4").click(function () {
        localStorage.removeItem("btn4");
        localStorage.removeItem("btn5");
        localStorage.setItem("btn4", "disabled");
        localStorage.setItem("btn5", "");
        $(".btn4").addClass(localStorage.getItem("btn4"));
        $(".btn5").removeClass("disabled");

        //  Set new map image with correct red selection
        map_image.setAttribute("xlink:href", "../images/map_4.jpg");

        if (myJsonParsed.missioni[3].type == "mult_choice") {
            window.location.href = `mult_choice.html?id_missione=3?&id=${myJsonID}`
        } else {
            window.location.href = `impiccato.html?id_missione=3?&id=${myJsonID}`
        }
    });

    $(".btn5").click(function () {
        localStorage.removeItem("btn5");
        localStorage.removeItem("btn6");
        localStorage.setItem("btn5", "disabled");
        localStorage.setItem("btn6", "");
        $(".btn5").addClass(localStorage.getItem("btn5"));
        $(".btn6").removeClass("disabled");

        //  Set new map image with correct red selection
        map_image.setAttribute("xlink:href", "../images/map_5.jpg");

        if (myJsonParsed.missioni[4].type == "mult_choice") {
            window.location.href = `mult_choice.html?id_missione=4?&id=${myJsonID}`
        } else {
            window.location.href = `impiccato.html?id_missione=4?&id=${myJsonID}`
        }
    });

    $(".btn6").click(function () {
        localStorage.removeItem("btn6");
        localStorage.removeItem("btn7");
        localStorage.setItem("btn6", "disabled");
        localStorage.setItem("btn7", "");
        $(".btn6").addClass(localStorage.getItem("btn6"));
        $(".btn7").removeClass("disabled");

        //  Set new map image with correct red selection
        map_image.setAttribute("xlink:href", "../images/map_6.jpg");

        if (myJsonParsed.missioni[5].type == "mult_choice") {
            window.location.href = `mult_choice.html?id_missione=5?&id=${myJsonID}`
        } else {
            window.location.href = `impiccato.html?id_missione=5?&id=${myJsonID}`
        }
    });

    $(".btn7").click(function () {
        localStorage.removeItem("btn7");
        localStorage.removeItem("btn8");
        localStorage.setItem("btn7", "disabled");
        localStorage.setItem("btn8", "");
        $(".btn7").addClass(localStorage.getItem("btn7"));
        $(".btn8").removeClass("disabled");

        //  Set new map image with correct red selection
        map_image.setAttribute("xlink:href", "../images/map_7.jpg");

        if (myJsonParsed.missioni[6].type == "mult_choice") {
            window.location.href = `mult_choice.html?id_missione=6?&id=${myJsonID}`
        } else {
            window.location.href = `impiccato.html?id_missione=6?&id=${myJsonID}`
        }
    });

    $(".btn8").click(function () {
        localStorage.removeItem("btn8");
        localStorage.removeItem("btn9");
        localStorage.setItem("btn8", "disabled");
        localStorage.setItem("btn9", "");
        $(".btn8").addClass(localStorage.getItem("btn8"));
        $(".btn9").removeClass("disabled");

        //  Set new map image with correct red selection
        map_image.setAttribute("xlink:href", "../images/map_8.jpg");

        if (myJsonParsed.missioni[7].type == "mult_choice") {
            window.location.href = `mult_choice.html?id_missione=7?&id=${myJsonID}`
        } else {
            window.location.href = `impiccato.html?id_missione=7?&id=${myJsonID}`
        }
    });

    $(".btn9").click(function () {
        localStorage.removeItem("btn9");
        localStorage.removeItem("btn10");
        localStorage.setItem("btn9", "disabled");
        localStorage.setItem("btn10", "");
        $(".btn9").addClass(localStorage.getItem("btn9"));
        $(".btn10").removeClass("disabled");

        //  Set new map image with correct red selection
        map_image.setAttribute("xlink:href", "../images/map_9.jpg");

        if (myJsonParsed.missioni[8].type == "mult_choice") {
            window.location.href = `mult_choice.html?id_missione=8?&id=${myJsonID}`
        } else {
            window.location.href = `impiccato.html?id_missione=8?&id=${myJsonID}`
        }
    });

    $(".btn10").click(function () {
        localStorage.removeItem("btn10");
        localStorage.setItem("btn10", "disabled");
        $(".btn1").addClass(localStorage.getItem("btn10"));

        //  Set new map image with correct red selection
        map_image.setAttribute("xlink:href", "../images/map_10.jpg");

        if (myJsonParsed.missioni[9].type == "mult_choice") {
            window.location.href = `mult_choice.html?id_missione=9?&id=${myJsonID}`
        } else {
            window.location.href = `impiccato.html?id_missione=9?&id=${myJsonID}`
        }
    });
});
