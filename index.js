/**
 * Gets the submit button and starts the waterfall onclick
 *
 */

document.getElementById('submit-btn').addEventListener('click', returnData);


/**
 * Takes 3 strings parts of a url and builds them up
 *
 * @param {string} baseUrl The base url
 * @param {string} apikey the apikey if needed otherwise can be omitted
 * @param {the specifics for the call to each API} data
 * @returns {string} Constructed url
 */
function urlConstructor(baseUrl, apikey, data) {
    if (data) {
        return baseUrl + apikey + data;
    } else if (apikey) {
        return baseUrl + apikey;
    }
    return baseUrl;
}



/**
 * Calls the waterfall with an initially empty object
 *
 * @param {object} event object
 */
function returnData(event) {
    event.preventDefault();
    var dataObj = {};
    dataObj.searchName = document.getElementById('name').value;
    //Call the waterfall with an empty object our tasks and the final call back
    //which renders the data to the dom
    waterfall(dataObj, [getGithubData, getStackData], renderToDOM);
}

/**
 * Creates a specified element with a class
 *
 * @param {string} type string
 * @param {string} myClass the desired class name
 * @returns {a constructed element} the element
 */
function createMyElement(type, myClass) {
    var myElem = document.createElement(type);
    if (myClass) {
        myElem.className = myClass;
    }
    return myElem;
}
