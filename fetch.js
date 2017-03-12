/**
 * A generic XMLHttpRequest
 *
 * @param {object} obj filled with data as fetch calls are made
 * @param {string} url A url string
 * @param {function} callback The function which handles the data
 */
function fetch(obj,url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.status === 200 && xhr.readyState === 4) {
            var response = JSON.parse(xhr.response);
            callback(obj,response);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}
