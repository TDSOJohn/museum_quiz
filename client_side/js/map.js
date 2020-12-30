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

jQuery(document).ready(function () {

    $('.uno').mouseout(function () {
        $("#map").attr('src', '../images/grotta_dell_uncino.jpg');
    }),
        $('.uno').mouseover(function () {
            $("#map").attr('src', '../images/grotta_dell_uncino.jpg');
        });

    $('.due').mouseout(function () {
        $("#map").attr('src', '../images/lago_senza_nome.jpg');
    }),
        $('.due').mouseover(function () {
            $("#map").attr('src', '../images/lago_senza_nome.jpg');
        });

    $('.tre').mouseout(function () {
        $("#map").attr('src', '../images/fiume_azzurro.jpg');
    }),
        $('.tre').mouseover(function () {
            $("#map").attr('src', '../images/fiume_azzurro.jpg');
        });

    $('.quattro').mouseout(function () {
        $("#map").attr('src', '../images/montagne_del_morto.jpg');
    }),
        $('.quattro').mouseover(function () {
            $("#map").attr('src', '../images/montagne_del_morto.jpg');
        });

    $('.cinque').mouseout(function () {
        $("#map").attr('src', '../images/passo_dell_impiccato.jpg');
    }),
        $('.cinque').mouseover(function () {
            $("#map").attr('src', '../images/passo_dell_impiccato.jpg');
        });

    $('.sei').mouseout(function () {
        $("#map").attr('src', '../images/sabbie_mobili.jpg');
    }),
        $('.sei').mouseover(function () {
            $("#map").attr('src', '../images/sabbie_mobili.jpg');
        });

    $('.sette').mouseout(function () {
        $("#map").attr('src', '../images/foresta_buia.jpg');
    }),
        $('.sette').mouseover(function () {
            $("#map").attr('src', '../images/foresta_buia.jpg');
        });

    $('.otto').mouseout(function () {
        $("#map").attr('src', '../images/montagna_del_fuoco.jpg');
    }),
        $('.otto').mouseover(function () {
            $("#map").attr('src', '../images/montagna_del_fuoco.jpg');
        });

    $('.nove').mouseout(function () {
        $("#map").attr('src', '../images/deserto_dei_serpenti.jpg');
    }),
        $('.nove').mouseover(function () {
            $("#map").attr('src', '../images/deserto_dei_serpenti.jpg');
        });

    $('.dieci').mouseout(function () {
        $("#map").attr('src', '../images/tesoro.jpg');
    }),
        $('.dieci').mouseover(function () {
            $("#map").attr('src', '../images/tesoro.jpg');
        });
});

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
