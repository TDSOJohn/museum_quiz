const baseURL   = '127.0.0.1';

const apiPort   = '3000';

var xhr         = new XMLHttpRequest();

var myURL       = ('http://' + encodeURIComponent(baseURL) +
                                ':' + encodeURIComponent(apiPort));

function send_file() {
    xhr.open("POST", myURL, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log("trying to send file...");

    var file = document.getElementById('json_uploader').files[0];

    xhr.send(file);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            console.log("file sent!");
        }
    }
}
