import * as utilities from './utilities.js';


var map_image;
let saveData = new Object;

/* set the state of the Buttons */
//  Add check: if everything is disabled, then enable btn1 and set mission_id to 1
function setValues() {
    //  add disabled class to everything, then remove it from mission_id button
    for(let i = 0; i < 10; i++)
        $(`.btn${i}`).addClass("disabled");

    $(`.btn${saveData.mission_id}`).removeClass("disabled");

    //  Accessibility features (cycle with "tab", enter with "return")
    $(`.btn${saveData.mission_id}`).attr('tabindex', '0');
    $(`.btn${saveData.mission_id}`).attr('autofocus', 'autofocus');

    document.querySelector(`.btn${saveData.mission_id}`).addEventListener("keyup", event =>
    {
        if(event.key !== "Enter") return;
        window.location.href = `gioco.html?id=${saveData.quiz_id}`;
    });
}

$(function ()
{
    saveData            = utilities.LSsanityCheck();
    console.log(saveData);

    setValues();

    let id_missione     = saveData.mission_id;
    map_image           = document.querySelector('#pirate_map');

    //  Set new map image with correct red selection
    map_image.setAttribute('href', `../images/map_${id_missione}.jpg`);

    for(let i = 0; i < 10; i++)
    {
        $(`.btn${i}`).on('click', function()
        {
            window.location.href = `gioco.html?id=${saveData.quiz_id}`;
        });
    }

});

function resetLocalStorage()
{
    localStorage.removeItem(`id${saveData.quiz_id}`);

    window.location.href = `gioco.html?id=${saveData.quiz_id}`;
}

window.resetLocalStorage = resetLocalStorage;
