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
