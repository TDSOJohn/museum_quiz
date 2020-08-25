const btn = document.querySelector('#btn');
// handle click button
btn.onclick = function() {
    const rbs = document.querySelectorAll('input[name="figure"]');
    let selectedValue;
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }
    if (selectedValue == "donna") {
        alert("missione compiuta");
    } else {
        alert("Che peccato hai sbagliato! Ritenta, questa volta non sbaglierai!")
    }
};