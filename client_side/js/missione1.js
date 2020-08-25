const btn = document.querySelector('#btn');
// handle click button
btn.onclick = function() {
    const rbs = document.querySelectorAll('input[name="year"]');
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }
    if (selectedValue == 1888) {
        alert("Missione compiuta");
    } else {
        alert("Che peccato hai sbagliato!Ritenta, questa volta non sbaglierai!");
    }

};