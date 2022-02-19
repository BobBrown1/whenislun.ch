function updateDate() {
    var str = "";

    var days = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    var months = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

    var now = new Date();

    // str += "Today is: " + days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()] + " " + now.getFullYear() + " " + now.getHours() +":" + now.getMinutes() + ":" + now.getSeconds();
    str += days[now.getDay()] + ", " + months[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear() + "<br>" + now.getHours() +":" + now.getMinutes() + ":" + now.getSeconds();

    document.getElementById("currentDate").innerHTML = "It is currently:"
    document.getElementById("todaysDate").innerHTML = str;
}

setInterval(updateDate, 1000);

function checkAll() {
    const approved = [];
    for (var i = 0; i < 9; i++) {
      var className = document.getElementById("name"+(i + 1)).value;

      if (className.length < 1) {
        continue;
      }

      var perTime = document.getElementById("perTime"+(i + 1)).value;

      var timereg=new RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9] ?[aApP]\.?[mM]\.?$");
      var nomilreg=new RegExp("^(1[3-9]|2[0-3]):[0-5][0-9] ?[aA]\.?[mM]\.?$");

      if (!timereg.test(perTime)) {
        alerttext.innerHTML = "Invalid time format in class: Period " + (i + 1);
        alertbox.style.display = "block";
        return false;
      };
      if (nomilreg.test(perTime)) {
        alerttext.innerHTML = "You used \"AM\" with a military time between 13:00 and 23:59 in class: Period " + (i + 1);
        alertbox.style.display = "block";
        return false;
      };

      if (!nomilreg.test(perTime) && timereg.test(perTime)) {
        approved.push({"name": document.getElementById("name"+(i+1)).value, "time": document.getElementById("perTime"+(i+1)).value});
      };
    }
    if (approved.length < 2) {
      alerttext.innerHTML = "You must have at least two classes in your schedule!";
      alertbox.style.display = "block";
      return false;
    };
    if(addToStorage(approved)) {
      alert("Success");
      window.location.reload();
    } else {
      alerttext.innerHTML = "There was an error storing your schedule. Please try again later.";
      alertbox.style.display = "block";
      return false;
    }
}

function addToStorage(classes) {
    localStorage.setItem("classes", JSON.stringify(classes));
    return true;
}

function viewSched() {
    var storedClasses = localStorage.getItem("classes");
    alert(storedClasses);
}

function removeSched() {
  localStorage.removeItem("classes");
  alert("Success");
}

function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

// When the user clicks on the button, open the modal
function shareSched() {
  if (localStorage.getItem("classes") == null) {
      alert("No set schedule.");
  } else {
      var classes = JSON.parse(localStorage.getItem("classes"));
      var param = "https://school.bob-brown.info/class?s=";
      for (var i = 0; i < classes.length; i++) {
          param += `${encodeURI(classes[i]["name"])}=${encodeURI(classes[i]["time"])};`;
      }
      document.getElementById("modal-header").innerHTML = "<strong>Your Customized Schedule Link:</strong><br>";
      var newparam = param.slice(0, -1);
      document.getElementById("modal-text").value = newparam;
      document.getElementById("myModal").style.display = "block";
}
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == document.getElementById("myModal")) {
  document.getElementById("myModal").style.display = "none";
}
}
