let back = document.getElementById("backButton");
back.onclick = function() {
    location.replace("../HTML/selection.html")
}
let loginButton = document.getElementsByClassName("loginButton")[0];
if (sessionStorage.student) {
    location.replace("../HTML/informationSearch.html");
} else {
    loginButton.onclick = function() {
        location.href = "../HTML/Login.html";
    }
}