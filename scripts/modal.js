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
        document.getElementById("modal-text").innerHTML = param;
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