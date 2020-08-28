const baseURL   = '127.0.0.1';

const apiPort   = '3000';

var xhr         = new XMLHttpRequest();

var myURL       = ('http://' + encodeURIComponent(baseURL) +
                                ':' + encodeURIComponent(apiPort));

var file        = '{"risposte":["1888","Gaugin","azzurro","73 x 58 cm","Nudo Blu","Donna","Composizione in Giallo, Blu e Rosso","Ricerca di Equilibrio","Vincent Van Gogh","I tre Girasoli"]}';


function send_file() {
    xhr.open("POST", myURL, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    console.log("trying to send file...");

    xhr.send(file);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            console.log("file sent!");
        }
    }
}
