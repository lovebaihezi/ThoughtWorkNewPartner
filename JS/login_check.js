var inputList = Array.from(document.querySelectorAll("input"));
var showInformationList = Array.from(document.getElementsByClassName("showInformation"));
var password = document.getElementById("password");
var adminPassword = document.getElementById("adminPassword");
var form = document.forms[0];
var submitButton = document.getElementById("submitButton");
inputList.forEach(function(item) {
    item.addEventListener("click", function() {
        item.classList.add("inputNotEmpty");
    });
    item.addEventListener("input", function() {
        item.classList.add("inputNotEmpty");
    })
});
password.addEventListener("dblclick", function() {
    if (password.type == "password") {
        password.setAttribute("type", "text");
    } else {
        password.setAttribute("type", "password");
    }
});