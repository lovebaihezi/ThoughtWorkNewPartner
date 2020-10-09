var inputList = Array.from(document.querySelectorAll("input"));
var showInformationList = Array.from(document.getElementsByClassName("showInformation"));
var password = document.getElementById("password");
var adminPassword = document.getElementById("adminPassword");
var form = document.forms[0];
var submitButton = document.getElementById("submitButton");
inputList.forEach(function(item) {
    item.addEventListener("keypress", function() {
        item.classList.add("inputNotEmpty");
    });
});
var passwordList = [password, adminPassword];
passwordList.forEach(function(item) {
    item.addEventListener("dblclick", function() {
        if (item.type == "password") {
            item.setAttribute("type", "text");
        } else {
            item.setAttribute("type", "password");
        }
    });
});