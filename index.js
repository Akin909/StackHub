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
 * Renders the data to the DOM
 *
 * @param {error object} error An error object
 * @param {Object} data The constructed object
 */
var renderToDOM = function(error, data) {
    var gitResults = document.querySelector('.git-results');
    var stackResults = document.querySelector('.stack-results');
    gitResults.innerHTML = '';
    stackResults.innerHTML = '';
    var gitDiv = createMyElement('div', 'github');
    var gitList = createMyElement('ul', 'githubList');
    var gitPic = createMyElement('img', 'git-pic');
    /**
     * Loops through the gitData array and pull props off the obj
     *
     * @param {object} item each object in the git data array
     */
    // console.log(data);
    gitPic.src = data.gitData[0].picture;
    data.gitData.forEach(function(item) {
        for (var prop in item) {
            if (prop !== 'picture') {
            var gitListItem = createMyElement('li', 'githubList');
            gitList.appendChild(gitListItem);
                gitListItem.innerText = item[prop];
            }
        }
    });
    gitDiv.appendChild(gitPic);
    gitDiv.appendChild(gitList);
    gitResults.appendChild(gitDiv);


    var stackDiv = createMyElement('div', 'stackOverflow');
    var stackList = createMyElement('ul', 'githubList');
    var stackSpan = createMyElement('div','stackSpan');
    console.log('stack questions: ',Array.isArray(data.stackQuestions));
    data.stackQuestions.forEach((question) => {
        console.log('question', question);
    var stackTitle = createMyElement('h1','stackQuestion');
    var stackLink = createMyElement('a','stackLink');
        console.log('stackTitle',stackTitle);
        stackDiv.appendChild(stackTitle);
        stackDiv.appendChild(stackLink);
        stackTitle.innerText = question.title;
        stackLink.href = question.url;
    });
    for (var stackProp in data.stackOverflow) {
        var stackListItem = createMyElement('li', 'stackList');
        stackList.appendChild(stackListItem);
        stackListItem.innerHTML = stackProp;
    }
    stackDiv.appendChild(stackList);
    stackResults.appendChild(stackDiv);
    stackResults.appendChild(stackSpan);
    if (error) {
        return Error('The request failed');
    }
};

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
