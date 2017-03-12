function getGithubData(obj, callback) {
    // console.log('get github args: ', arguments);
    obj.searchName = obj.searchName ? obj.searchName : 'akin909';
    var github = urlConstructor('https://api.github.com/users/', obj.searchName);
    var githubRepos = urlConstructor('https://api.github.com/users/', obj.searchName + '/repos');
    var gitArray = [];
    // console.log('Waterfall function 1');
    var githubDets = [github, githubRepos];
    githubDets.forEach((url) => {
        fetch(obj, url, function(obj, response) {
            console.log(response);
            if (Array.isArray(response)) {
                var gitObj = {};
                var gitLang = {};
                response.forEach((item) => {
                    gitObj[item.name] = item.name + ',' + ' language: ' + item.language;
                    // console.log(item.language);
                    gitLang[item.name + '-language'] = item.language;
                });
                // console.log(gitObj);
                gitObj.languages = gitLang;
                gitArray.push(gitObj);
            } else if (!Array.isArray(response)) {
                var gitDets = {};
                gitDets.picture = response.avatar_url;
                gitDets.login = response.login;
                gitDets.bio = response.bio;
                gitDets.publicRepos = response.public_repos;
                gitArray.push(gitDets);
            }

            // Parallel function
            if (gitArray.length === githubDets.length) {
                obj.gitData = gitArray;
                // console.log('obj', obj);
                return callback(null, obj);
            }
        });
    });
}

function getStackData(obj, callback) {
    // console.log('stack func args: ', arguments);
    var languages = obj.gitData[1].languages;
    var query = document.getElementById('submission').value;
    var stack = urlConstructor('https://api.stackexchange.com/2.2/questions/featured?tagged=', query + '&site=stackoverflow');
    // var stackUser = urlConstructor('https://api.stackexchange.com/2.2/users/?', obj.searchName + '&site=stackoverflow');
    fetch(obj, stack, function(obj, response) {
        // console.log('Waterfall function 2');
        var stackObj = {};
        response.items.forEach((item) => {
            stackObj[item.title] = item.title;
            obj.stackOverflow = stackObj;
        });
    });

    var langKeys = [];
    for (var language in languages) {
        langKeys.push(languages[language]);
    }

    function unique(array) {
        return array.reduce(function(uniqueItems, item) {
            if (!uniqueItems.find(uniqueItem => uniqueItem === item)) {
                uniqueItems.push(item);
            }
            return uniqueItems;
        }, []);
    }
    langKeys = unique(langKeys);
    // console.log(langKeys);
    var stackArray = [];
    langKeys.forEach((lang, i) => {
        if (lang !== null) {
            var stackLang = urlConstructor(
                'https://api.stackexchange.com/2.2/questions/featured?tagged=',
                lang.toLowerCase() + '&site=stackoverflow');
            // console.log('stackUrl: ',stackLang);
            fetch(obj, stackLang, function(obj, response) {

                // console.log('Parallel function');
                response.items.forEach((item) => {
                    if (stackArray.length <= 5) {
                        var stackObj = {};
                        stackObj['question'] = item.title;
                        stackObj['url'] = item.link;
                        stackArray.push(stackObj);
                    }
                });
            });
        }
        obj.stackQuestions = stackArray;
    });
    console.log('stackArray', stackArray);
    if (stackArray.length <=  5) {
        console.log(obj);
        return callback(null, obj);
    }
}
