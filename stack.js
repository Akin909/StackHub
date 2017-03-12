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
