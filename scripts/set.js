const getParams = window.location.search;
const urlParams = new URLSearchParams(getParams);

if (urlParams.has('s')) {
    var sched = urlParams.get('s');
    var classList = sched.split(";");
    if (classList.length > 9) {
        window.location.href = "https://school.bob-brown.info/";
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
        window.location.href = "https://school.bob-brown.info/";
    }
} else {
    window.location.href = "https://school.bob-brown.info/";
}