const getParams = window.location.search;
const urlParams = new URLSearchParams(getParams);

if (urlParams.has('s')) {
    var sched = urlParams.get('s');
    var classList = sched.split(";");
    if (classList.length > 11 || classList.length > 1) {
        window.location.href = `https://${window.location.hostname}/`;
    } 
    var schedList = []
    for (var i = 0; i < classList.length; i++) {
        var itemList = classList[i].split("=");
        schedList.push({"name": itemList[0], "time": itemList[1]})
    }
    localStorage.setItem("classes", JSON.stringify(schedList));
    if (confirm("Your schedule has been set! Would you like to remain on this page so you can bookmark your class?")) {
        document.write("<a href='https://school.bob-brown.info'>Return Home</a>");
    } else {
        window.location.href = `https://${window.location.hostname}/`;
    }
} else {
    window.location.href = `https://${window.location.hostname}/`;
}