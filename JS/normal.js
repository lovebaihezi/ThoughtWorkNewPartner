let back = document.getElementById("backButton");
back.onclick = function() {
    location.replace("../HTML/selection.html")
}
try {
    let goLoginButton = document.getElementsByClassName("loginButton")[0];
    goLoginButton.addEventListener("click", function() {
        if (sessionStorage.student) {
            location.replace("../HTML/informationSearch.html");
        } else {
            loginButton.onclick = function() {
                location.href = "../HTML/Login.html";
            }
        }
    })
} catch (err) {

}