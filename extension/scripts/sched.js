var now = new Date();

if (localStorage.getItem("classes") != null) {
    var classes = JSON.parse(localStorage.getItem("classes"));
    document.getElementById("schedule").innerHTML += "<strong><u>Today's Schedule:</u></strong><br>";
    for (var i = 0; i < classes.length; i++) {
        document.getElementById("schedule").innerHTML += (i + 1) + ". " + classes[i]["name"] + " - Ends At " + classes[i]["time"] + "<button class='timeuntil' onclick=timeUntil('" + encodeURIComponent(classes[i]["time"]) + "','" + encodeURIComponent(classes[i]["name"]) + "')>Time Until End</button>" +"<br>";
    }
    setInterval(beginCounter, 1000);
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
    var AMPM = time.match(/(am|pm)$/i)[1];
    let lowercase = AMPM.toLowerCase();
    if(lowercase == "pm" && hours<12) hours = hours+12;
    if(lowercase == "am" && hours==12) hours = hours-12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if(hours<10) sHours = "0" + sHours;
    if(minutes<10) sMinutes = "0" + sMinutes;
    var newDate = new Date();
    newDate.setHours(sHours);
    newDate.setMinutes(sMinutes);
    newDate.setSeconds(0);
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
  
    var currentClass;

    var sorted = classes.sort((a, b) => {
        var date = new Date(a.realTime);
        var dateb = new Date(b.realTime);

        if (date > dateb)
            return 1;

        if (date < dateb)
            return -1;

        return 0;
    })

    var now = new Date();

    for(var i = 0; i < classes.length; i++){
        var classesDate = new Date(classes[i]["realTime"]);
        var between = now.getTime() - classesDate.getTime();
          
        if (between < 0) {
            currentClass = classes[i];
    
            break;
        }
    }
    
    // var classIndex = classTimes.indexOf(currentClass);
    if (! currentClass) {
      document.getElementById("timeLeft").style.display = "none";
      document.getElementById("current").innerHTML = "Your day is over!";
  } else {
        
    var classIndex = classes.indexOf(currentClass);
    
    var classEnd = new Date(classes[Math.abs(classIndex)]["realTime"]);
    var now = new Date();
    var timeBetween = Math.abs(now.getTime() - classEnd.getTime());
    
    // Convert to min/sec

    var hours = Math.floor((timeBetween / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((timeBetween % 36e5) / 6e4);
    var seconds = ((timeBetween % 6e4) / 1000).toFixed(0);
    document.getElementById("current").innerHTML = "You are currently in <u>" + classes[Math.abs(classIndex)]["name"] + "</u>.";
    document.getElementById("timeLeft").innerHTML = `You have ${(hours < 10) ? "0" + hours : hours}:${(minutes < 10) ? "0" + minutes : minutes}:${(seconds < 10 ? "0" : "")}${seconds} left.`;
    return false;
}
}

function timeUntil(strTime, classname) {
    var decodedTime = decodeURIComponent(strTime);
    var now = new Date();
    var hours = Number(decodedTime.match(/^(\d+)/)[1]);
    var minutes = Number(decodedTime.match(/:(\d+)/)[1]);
    var AMPM = decodedTime.match(/(am|pm)$/i)[1];
    let lowercase = AMPM.toLowerCase();
    if(lowercase == "pm" && hours<12) hours = hours+12;
    if(lowercase == "am" && hours==12) hours = hours-12;
    var sHours = hours.toString();
    var sMinutes = minutes.toString();
    if(hours<10) sHours = "0" + sHours;
    if(minutes<10) sMinutes = "0" + sMinutes;
    var classtime = new Date();
    classtime.setHours(sHours);
    classtime.setMinutes(sMinutes);
    classtime.setSeconds(0);
    if (now.getTime() > classtime.getTime()) {
        alert("This is in the past!");
    } else {
        var timeUntil = Math.abs(now.getTime() - classtime.getTime());
        var classHours = Math.floor((timeUntil / (1000 * 60 * 60)) % 24);
        var classMinutes = Math.floor((timeUntil % 36e5) / 6e4);
        var classSeconds = ((timeUntil % 6e4) / 1000).toFixed(0);
        alert(`You have ${(classHours < 10) ? "0" + classHours : classHours}:${(classMinutes < 10) ? "0" + classMinutes : classMinutes}:${(classSeconds < 10 ? "0" : "")}${classSeconds} left until the end of ${decodeURIComponent(classname)}`);
    }
}