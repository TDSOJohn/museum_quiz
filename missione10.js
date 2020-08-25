const btn = document.querySelector('#btn');
// handle click button
btn.onclick = function() {
    const cbs = document.querySelectorAll('input[name="title"]');
    let selectedValue;
    for (const cb of cbs) {
        if (cb.checked) {
            selectedValue = cb.value;
            break;
        }
    }

    if (selectedValue == "I Girasoli") {
        alert("Missione compiuta!");

    } else {
        alert("Che peccato hai sbagliato! Ritenta, questa volta non sbaglierai!")
    }

};