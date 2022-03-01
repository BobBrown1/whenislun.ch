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
        schedList.push({"name": itemList[0], "time": itemList[1]})
    }
    localStorage.setItem("classes", JSON.stringify(schedList));
    alert("Your schedule has been set! You may now bookmark this page if you wish. Otherwise, click 'OK' to continue.");
    window.location.href = `https://${window.location.hostname}/?a=refresh`;
} else {
    window.location.href = `https://${window.location.hostname}/`;
}