function waterfall(args, tasks, callback) {
    var nextTask = tasks[0];
    var remainingTasks = tasks.slice(1);
    if (tasks.length !== 0 || typeof nextTask !== 'undefined') {
        //Each task function is called with a callback which it is passed, this
        //callback is an anonymous function that throws an error or calls the
        //waterfall with the result of the last task
        nextTask(args, function(error, result) {
            if (error) {
                callback(error);
                return;
            }
            waterfall(result, remainingTasks, callback);
        });
    } else if (tasks.length === 0) {
        return callback(null, args);
    }
}
