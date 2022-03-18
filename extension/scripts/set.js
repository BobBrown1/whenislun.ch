const getParams = window.location.search;
const urlParams = new URLSearchParams(getParams);

if (urlParams.has('s')) {
    var sched = urlParams.get('s');
    var classList = sched.split(";");
    if (classList.length > 10 || classList.length < 1) {
        window.location.href = `https://${window.location.hostname}/?a=refresh`;
    }
    var schedList = []
    for (var i = 0; i < classList.length; i++) {
        var itemList = classList[i].split("=");
        if(checkAll(itemList[0], itemList[1])) {
        schedList.push({"name": itemList[0], "time": itemList[1]})
        } else {
            window.location.href = `https://${window.location.hostname}/`;
        }
    }
    localStorage.setItem("classes", JSON.stringify(schedList));
} else {
    window.location.href = `https://${window.location.hostname}/`;
}

function checkAll(className, perTime) {
      if (className.length < 1) {
          alert("Invalid class name(s) in link.");
          return false;
      }

      var timereg=new RegExp("^([01]?[0-9]|2[0-3]):[0-5][0-9] ?[aApP]\.?[mM]\.?$");
      var nomilreg=new RegExp("^(1[3-9]|2[0-3]):[0-5][0-9] ?[aA]\.?[mM]\.?$");

      if (!timereg.test(perTime)) {
        alert("Invalid time format in class: Period " + (i + 1));
        return false;
      };
      if (nomilreg.test(perTime)) {
        alert("You used \"AM\" with a military time between 13:00 and 23:59 in class: Period " + (i + 1));
        return false;
      };

      if (!nomilreg.test(perTime) && timereg.test(perTime)) {
          return true;
      };
}