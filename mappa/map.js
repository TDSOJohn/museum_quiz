function precarica(img) {
    $(img).each(function() {
        $('<img/>')[0].src = this;
    });
}
precarica([
    'grotta_dell_uncino.jpg',
    'lago_senza_nome.jpg',
    'fiume_azzurro.jpg',
    'montagne_del_morto.jpg',
    'passo_dell_impiccato.jpg',
    'sabbie_mobili.jpg',
    'foresta_buia.jpg',
    'montagna_del_fuoco.jpg',
    'deserto_dei_serpenti.jpg.jpg',
    'tesoro.jpg'
]);

/*******jQuery for external title*********/

jQuery(document).ready(function() {


    $('.uno').mouseout(function() {
            $("#map").attr('src', 'grotta_dell_uncino.jpg');

        }),
        $('.uno').mouseover(function() {
            $("#map").attr('src', 'grotta_dell_uncino.jpg');
        });


    $('.due').mouseout(function() {
            $("#map").attr('src', 'lago_senza_nome.jpg');
        }),
        $('.due').mouseover(function() {
            $("#map").attr('src', 'lago_senza_nome.jpg');
        });

    $('.tre').mouseout(function() {
            $("#map").attr('src', 'fiume_azzurro.jpg');
        }),
        $('.tre').mouseover(function() {
            $("#map").attr('src', 'fiume_azzurro.jpg');
        });

    $('.quattro').mouseout(function() {
            $("#map").attr('src', 'montagne_del_morto.jpg');
        }),
        $('.quattro').mouseover(function() {
            $("#map").attr('src', 'montagne_del_morto.jpg');
        });

    $('.cinque').mouseout(function() {
            $("#map").attr('src', 'passo_dell_impiccato.jpg');
        }),
        $('.cinque').mouseover(function() {
            $("#map").attr('src', 'passo_dell_impiccato.jpg');
        });

    $('.sei').mouseout(function() {
            $("#map").attr('src', 'sabbie_mobili.jpg');
        }),
        $('.sei').mouseover(function() {
            $("#map").attr('src', 'sabbie_mobili.jpg');
        });

    $('.sette').mouseout(function() {
            $("#map").attr('src', 'foresta_buia.jpg');
        }),
        $('.sette').mouseover(function() {
            $("#map").attr('src', 'foresta_buia.jpg');
        });

    $('.otto').mouseout(function() {
            $("#map").attr('src', 'montagna_del_fuoco.jpg');
        }),
        $('.otto').mouseover(function() {
            $("#map").attr('src', 'montagna_del_fuoco.jpg');
        });

    $('.nove').mouseout(function() {
            $("#map").attr('src', 'deserto_dei_serpenti.jpg');
        }),
        $('.nove').mouseover(function() {
            $("#map").attr('src', 'deserto_dei_serpenti.jpg');
        });

    $('.dieci').mouseout(function() {
            $("#map").attr('src', 'tesoro.jpg');
        }),
        $('.dieci').mouseover(function() {
            $("#map").attr('src', 'tesoro.jpg');
        });

});