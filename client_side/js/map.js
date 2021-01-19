var map_image;


/*******jQuery for external title*********/

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

    localStorage.setItem('mission_id', 0);
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

    const myJson        = localStorage.getItem('myJson');
    const myJsonParsed  = JSON.parse(myJson);
    const myJsonID      = localStorage.getItem('myJsonID');

    console.log(myJsonParsed.missioni[0].type)
    if (!localStorage.getItem("btn1")) {
        valoriIniziali();
        setValues();
    } else {
        setValues();
    }

    id_missione         = localStorage.getItem('mission_id');
    map_image           = document.querySelector('#pirate_map');

    //  Set new map image with correct red selection
    map_image.setAttribute('href', `../images/map_${id_missione}.jpg`);


    for(let i = 0; i < 10; i++)
    {
        $(`.btn${i+1}`).click(function () {

            localStorage.removeItem(`btn${i+1}`);
            if(i < 9)
            {
                localStorage.removeItem(`btn${i+2}`);
                localStorage.setItem(`btn${i+2}`, "");
            }
            localStorage.setItem(`btn${i+1}`, "disabled");

            localStorage.setItem('mission_id', `${i+1}`);

            $(`btn${i+1}`).addClass(localStorage.getItem(`btn${i+1}`));
            $(`btn${i+1}`).removeClass("disabled");

            //  Set new map image with correct red selection
            map_image.setAttribute('href', `../images/map_${id_missione}.jpg`);

            window.location.href = `gioco.html?id_missione=${i}?&id=${myJsonID}`;
        });
    }
});
