function precarica(img) {
    $(img).each(function() {
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

jQuery(document).ready(function() {

    $('.uno').mouseout(function() {
        $("#map").attr('src', '../images/grotta_dell_uncino.jpg');
    }),
    $('.uno').mouseover(function() {
        $("#map").attr('src', '../images/grotta_dell_uncino.jpg');
    });

    $('.due').mouseout(function() {
        $("#map").attr('src', '../images/lago_senza_nome.jpg');
    }),
    $('.due').mouseover(function() {
        $("#map").attr('src', '../images/lago_senza_nome.jpg');
    });

    $('.tre').mouseout(function() {
        $("#map").attr('src', '../images/fiume_azzurro.jpg');
    }),
    $('.tre').mouseover(function() {
        $("#map").attr('src', '../images/fiume_azzurro.jpg');
    });

    $('.quattro').mouseout(function() {
        $("#map").attr('src', '../images/montagne_del_morto.jpg');
    }),
    $('.quattro').mouseover(function() {
        $("#map").attr('src', '../images/montagne_del_morto.jpg');
    });

    $('.cinque').mouseout(function() {
        $("#map").attr('src', '../images/passo_dell_impiccato.jpg');
    }),
    $('.cinque').mouseover(function() {
        $("#map").attr('src', '../images/passo_dell_impiccato.jpg');
    });

    $('.sei').mouseout(function() {
        $("#map").attr('src', '../images/sabbie_mobili.jpg');
    }),
    $('.sei').mouseover(function() {
        $("#map").attr('src', '../images/sabbie_mobili.jpg');
    });

    $('.sette').mouseout(function() {
        $("#map").attr('src', '../images/foresta_buia.jpg');
    }),
    $('.sette').mouseover(function() {
        $("#map").attr('src', '../images/foresta_buia.jpg');
    });

    $('.otto').mouseout(function() {
        $("#map").attr('src', '../images/montagna_del_fuoco.jpg');
    }),
    $('.otto').mouseover(function() {
        $("#map").attr('src', '../images/montagna_del_fuoco.jpg');
    });

    $('.nove').mouseout(function() {
        $("#map").attr('src', '../images/deserto_dei_serpenti.jpg');
    }),
    $('.nove').mouseover(function() {
        $("#map").attr('src', '../images/deserto_dei_serpenti.jpg');
    });

    $('.dieci').mouseout(function() {
        $("#map").attr('src', '../images/tesoro.jpg');
    }),
    $('.dieci').mouseover(function() {
        $("#map").attr('src', '../images/tesoro.jpg');
    });
});
