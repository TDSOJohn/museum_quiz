var map_image;

function LSsanityCheck()
{
    let id_temp         = +localStorage.getItem('myJsonID');
    let json_temp       = localStorage.getItem('myJson');
    let mission_id_temp = +localStorage.getItem('mission_id');
}

/*******jQuery for external title*********/

/* I valori iniziali dei bottoni */
function valoriIniziali() {
    localStorage.setItem("btn1", "nessunaclasse");

    for(let i = 2; i < 11; i++)
        localStorage.setItem(`btn${i}`, "disabled");

    localStorage.setItem('mission_id', 0);
}
/* set the state of the Buttons */
//  Add check: if everything is disabled, then enable btn1 and set mission_id to 1
function setValues() {
    for(let i = 0; i < 10; i++)
        $(`.btn${i+1}`).addClass(localStorage.getItem(`btn${i+1}`));
}

$(function ()
{
    const myJsonID      = +localStorage.getItem('myJsonID');

    if (!localStorage.getItem("btn1")) {
        valoriIniziali();
        setValues();
    } else {
        setValues();
    }

    id_missione         = +localStorage.getItem('mission_id');
    map_image           = document.querySelector('#pirate_map');

    //  Set new map image with correct red selection
    map_image.setAttribute('href', `../images/map_${id_missione + 1}.jpg`);
    if(id_missione == 0)
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

            localStorage.setItem('mission_id', `${i}`);

            $(`btn${i+1}`).addClass(localStorage.getItem(`btn${i+1}`));
            $(`btn${i+1}`).removeClass("disabled");

            window.location.href = `gioco.html?id=${myJsonID}`;
        });
    }
});

function resetLocalStorage()
{
    let id = +localStorage.getItem('myJsonID');
    localStorage.clear();

    if(id == null)
    {
        id = 1;
    }
    window.location.href = `gioco.html?id=${id}`;
}
