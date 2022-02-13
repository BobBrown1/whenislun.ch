var now = new Date();

if (localStorage.getItem("classes") == null) {
} else {
    var classes = JSON.parse(localStorage.getItem("classes"));
    document.getElementById("schedule").innerHTML += "<strong>Schedule:</strong><br>";
    for (var i = 0; i < classes.length; i++) {
        document.getElementById("schedule").innerHTML += (i + 1) + ". " + classes[i]["name"] + " - Ends At " + classes[i]["time"] + "<br>";
  }
    setInterval(beginCounter, 1000);;
}

function beginCounter() {
if (localStorage.getItem("classes") !== null) {
  if (convertTimes()) {
      if (duplicateCheck() !== true) {
        showClass();
        } else {
            alert("Your schedule contains duplicate times and cannot be processed!");
        }
    }
}
}


function convertTimes() {
  var classes = JSON.parse(localStorage.getItem("classes"));
  for (var i = 0; i < classes.length; i++) {
    var time = JSON.parse(localStorage.getItem("classes"))[i]["time"];
    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];
    if(AMPM == "pm" && hours<12) hours = hours+12;
    if(AMPM == "am" && hours==12) hours = hours-12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if(hours<10) sHours = "0" + sHours;
    if(minutes<10) sMinutes = "0" + sMinutes;
    var newDate = new Date();
    newDate.setHours(sHours);
    newDate.setMinutes(sMinutes);
    classes[i] = {"name": classes[i]["name"], "time": classes[i]["time"], "realTime": newDate};
  }
  localStorage.setItem("classes", JSON.stringify(classes));
  return true;
}

function duplicateCheck() {
    var classes = JSON.parse(localStorage.getItem("classes"));
    var classTimes = [];
    for (var i = 0; i < classes.length; i++) {
        classTimes.push(classes[i]["realTime"]);
    }
    return new Set(classTimes).size !== classTimes.length;
  }

function showClass() {
  var classes = JSON.parse(localStorage.getItem("classes"));
  
  var now = new Date();
  var classTimes = []

  for(var i = 0; i < classes.length; i++){
    var classesDate = new Date(classes[i]["realTime"]);
    var between = now.getTime() - classesDate.getTime();
    if (between < 0) {
        classTimes.push(between);
    }
}


var currentClass = Math.max(...classTimes);
// var classIndex = classTimes.indexOf(currentClass);
console.log(currentClass);
var classIndex = classes.map(function(e) { return e.realTime; }).indexOf(new Date(currentClass).getTime());
var currentDisplay = document.getElementById("current");

var classEnd = new Date(classes[classIndex]["realTime"]);
var now = new Date();
var timeBetween = Math.abs(now.getTime() - classEnd.getTime());

// Convert to min/sec

var minutes = Math.floor((timeBetween % 36e5) / 6e4);
var seconds = ((timeBetween % 6e4) / 1000).toFixed(0);
currentDisplay.innerHTML = classes[classIndex]["name"] + " - ";
currentDisplay.innerHTML += `${minutes}:${(seconds < 10 ? "0" : "")}${seconds}`;
}