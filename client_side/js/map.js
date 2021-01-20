var map_image;

/*******jQuery for external title*********/

/* I valori iniziali dei bottoni */
function valoriIniziali() {
    localStorage.setItem('btn1', 'nessunaclasse');
    for (let i = 2; i < 11; i++) {
        localStorage.setItem(`btn${i}`, 'disabled');
        console.log('valore del mio i', i);
    }

    localStorage.setItem('mission_id', 0);
}
/* set the state of the Buttons */
function setValues() {
    for (let i = 1; i < 11; i++) {
        $(`.btn${i}`).addClass(localStorage.getItem(`btn${i}`));
        console.log('valore i in set values', i);
    }
}

$(function () {
    const myJson = localStorage.getItem('myJson');
    const myJsonParsed = JSON.parse(myJson);
    const myJsonID = localStorage.getItem('myJsonID');

    console.log(myJsonParsed.missioni[0].type);
    if (!localStorage.getItem('btn1')) {
        valoriIniziali();
        setValues();
    } else {
        setValues();
    }

    id_missione = localStorage.getItem('mission_id');
    map_image = document.querySelector('#pirate_map');

    //  Set new map image with correct red selection
    map_image.setAttribute('href', `../images/map_${id_missione}.jpg`);

    for (let i = 0; i < 10; i++) {
        $(`.btn${i + 1}`).click(function () {
            localStorage.removeItem(`btn${i + 1}`);
            if (i < 9) {
                localStorage.removeItem(`btn${i + 2}`);
                localStorage.setItem(`btn${i + 2}`, '');
            }
            localStorage.setItem(`btn${i + 1}`, 'disabled');

            localStorage.setItem('mission_id', `${i + 1}`);

            $(`btn${i + 1}`).addClass(localStorage.getItem(`btn${i + 1}`));
            $(`btn${i + 1}`).removeClass('disabled');

            //  Set new map image with correct red selection
            map_image.setAttribute('href', `../images/map_${id_missione}.jpg`);

            window.location.href = `gioco.html?id_missione=${i}?&id=${myJsonID}`;
        });
    }
});
