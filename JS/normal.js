window.onload = function() {
    let back = document.getElementById("back");
    back.onclick = function() {
        history.go(-1);
    }
    let loginButton = document.getElementsByClassName("login")[0];
    if (sessionStorage.student) {
        location.replace("../HTML/informationSearch.html");
    } else {
        loginButton.onclick = function() {
            location.href = "../HTML/Login.html";
        }
    }
}