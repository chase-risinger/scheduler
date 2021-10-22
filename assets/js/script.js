var saveBtn9 = document.querySelector("#saveBtn9")
var description9 = document.querySelector("#description9")
var currentDay = document.querySelector("#currentDay");
var now = moment().format('MMMM Do YYYY');
currentDay.textContent = now;
listOfSavedTasks = [];
var savedTaskCounter = 0;

var descriptionClickHandler = function () {
    console.log("clicked desc");
    $(this).replaceWith("<textarea>");
}

var saveClickHandler = function () {
    var textArea = document.querySelector("textarea");
    console.log(textArea.value);
    console.log("clicked save");
    var timeBlock = description9.parentNode;

    console.log(timeBlock.dataset.hour)
    saveTaskToLocal()
}

var checkForSavedTasks = function () {
    var savedTasks = localStorage.getItem("tasks");
    if (!savedTasks) {
        return false;
    }
    console.log("Saved Tasks found!");

    savedTasks = JSON.parse(savedTasks);
    for (var i = 0; i < savedTasks.length; i++) {
        listOfSavedTasks.push(savedTasks[i]);
        var storedDescription = savedTasks[i]["description"];
        var storedHour = savedTasks[i]["hour"];
        var elements = document.getElementsByClassName('time-block');
        for (var i = 0; i < elements.length; i++) {
            if (storedHour == elements[i].dataset.hour) {
                $(elements[i]).append(storedDescription)
            }
        }
        savedTaskCounter++

    }
}

var saveTaskToLocal = function (hour, description) {
    var taskObj = {
        "hour": hour,
        "description": description,
        "id": savedTaskCounter
    };
    // listOfHighScores.push(highScoreObj);
    // listOfHighScores = JSON.stringify(listOfHighScores);
    // localStorage.setItem("scores", listOfHighScores);
    // time = 99999
}


var colorCodeTimes = function () {
    var elements = document.getElementsByClassName('time-block');
    for (var i = 0; i < elements.length; i++) {
        console.log(elements[i].dataset.hour, moment().format('H'));
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

colorCodeTimes();



description9.addEventListener("click", descriptionClickHandler);
saveBtn9.addEventListener("click", saveClickHandler);
