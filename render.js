function appendToDOM(element, parent) {
    parent.appendChild(element);
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
    var gitImgFig = createMyElement('figure', 'github-image');
    var gitPic = createMyElement('img', 'git-pic');
    var gitName = createMyElement('h1', 'git-name');
    var gitBio = createMyElement('figcaption', 'git-bio');
    /**
     * Loops through the gitData array and pull props off the obj
     *
     * @param {object} item each object in the git data array
     */
    // console.log(data);
    gitPic.src = data.gitData[0].picture;
    gitBio.textContent = data.gitData[0].bio;
    gitName.textContent = data.gitData[0].login;
    data.gitData.forEach(function(item) {
        for (var prop in item) {
            if (prop !== 'picture' &&
                prop !== 'login' &&
                prop !== 'bio' &&
                !Array.isArray(prop)
            ) {
                var gitListItem = createMyElement('li', 'githubList');
                gitList.appendChild(gitListItem);
                gitListItem.innerText = item[prop];
            }
        }
    });
    appendToDOM(gitPic,gitImgFig);
    gitImgFig.appendChild(gitBio);
    // appendToDom(gitBio,gitImgFig);
    var gitElements = [gitImgFig, gitName, gitList];
    gitElements.forEach((element) => {
        appendToDOM(element, gitDiv);
    });
    gitResults.appendChild(gitDiv);

    var stackDiv = createMyElement('div', 'stackOverflow');
    var stackList = createMyElement('ul', 'githubList');
    var stackSpan = createMyElement('div', 'stackSpan');
    data.stackQuestions.forEach((question) => {
        console.log('question', question);
        var stackTitle = createMyElement('h1', 'stackQuestion');
        var stackLink = createMyElement('a', 'stackLink');
        console.log('stackTitle', stackTitle);
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
