var saveBtn9 = document.querySelector("#saveBtn9")
var description9 = document.querySelector("#description9")
var currentDay = document.querySelector("#currentDay");
var now = moment().format('MMMM Do YYYY');
var savedTaskEl = document.querySelector("#savedTaskSection")
currentDay.textContent = now;
listOfSavedTasks = [];
var savedTaskCounter = 0;
listOfSomething = [];

var descriptionClickHandler = function () {
    $(this).replaceWith("<textarea>");
}

var saveClickHandler = function () {
    var textArea = document.querySelector("textarea");
    var hour = "09";
    var description = textArea.value;
    saveTaskToLocal(hour, description)
}

var checkForSavedTasks = function () {
    var savedTasks = localStorage.getItem("tasks");
    if (!savedTasks) {
        return false;
    }
    console.log("Saved Tasks found!");

    savedTasks = JSON.parse(savedTasks);
    console.log(savedTasks)
    for (var i = 0; i < savedTasks.length; i++) {
        listOfSavedTasks.push(savedTasks[i]);
        var storedDescription = savedTasks[i]["description"];
        var storedHour = savedTasks[i]["hour"];
        var savedTaskListEl = ("You had a task " + storedDescription + "saved for " + storedHour + "<br>");
        listOfSomething.push(savedTaskListEl);

        savedTaskCounter++

    }
    console.log(listOfSomething)
    savedTaskEl.append(listOfSomething)
}

var saveTaskToLocal = function (hour, description) {
    var taskObj = {
        "hour": hour,
        "description": description,
        "id": savedTaskCounter
    };
    console.log(taskObj)
    listOfSavedTasks.push(taskObj);
    listOfSavedTasks = JSON.stringify(listOfSavedTasks);
    localStorage.setItem("tasks", listOfSavedTasks);

}


var colorCodeTimes = function () {
    var elements = document.getElementsByClassName('time-block');
    for (var i = 0; i < elements.length; i++) {

        if (moment().format('H') > elements[i].dataset.hour) {
            $(elements[i]).addClass("past")
        }
        else if (moment().format('H') == elements[i].dataset.hour) {
            $(elements[i]).addClass("present")
        }
        else {
            $(elements[i]).addClass("future")
        }
    }
}
checkForSavedTasks();
colorCodeTimes();



description9.addEventListener("click", descriptionClickHandler);
saveBtn9.addEventListener("click", saveClickHandler);
