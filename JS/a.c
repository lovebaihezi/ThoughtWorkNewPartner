if (sessionStorage.student) {
    if (sessionStorage.interview) {
        location.href = "./su.html";
    } else {
        try {
            history.go(-1);
        } catch (error) {
            location.href = "./selection.html";
        }
    }
}
var loginButton = document.getElementById("normalSubmit");
var changeToStudentApplyOrLogin = document.getElementById("leftButton");
var changeToAdminLogin = document.getElementById("rightButton");
var studentForm = document.forms[0];
var adminForm = document.forms[1];
var loginOrApply = document.getElementById("showApplyButton");
var extraForm = document.getElementById("otherInformation");
loginOrApply['isClick'] = false;
loginOrApply.addEventListener("click", function() {
    loginOrApply['isClick'] = true;
    loginOrApply.classList.add("close");
    extraForm.style.display = "none";
});
studentForm.addEventListener("submit", function(formEvent) {
    formEvent.preventDefault();
    if (loginOrApply['isClick']) {
        login();
    } else {
        apply();
    }
});
adminForm.addEventListener("submit", function(formEvent) {
    formEvent.preventDefault();
    adminLogin();
});
changeToAdminLogin.addEventListener("click", function() {
    changeToAdminLogin.classList.add("on");
    changeToStudentApplyOrLogin.classList.remove("on");
    closeForm(studentForm);
    showForm(adminForm);
});
changeToStudentApplyOrLogin.addEventListener("click", function() {
    changeToAdminLogin.classList.remove("on");
    changeToStudentApplyOrLogin.classList.add("on");
    showForm(studentForm);
    closeForm(adminForm);
});

function packInformation(form) {
    var allInformation = {};
    for (var i = 0; i < form.elements.length; i++) {
        allInformation[form.elements[i]['name']] = form.elements[i]['value'];
    }
    return JSON.stringify(allInformation);
}

function sendInformation(json, place, action) {
    var newAjax = new XMLHttpRequest();
    newAjax.open("post", place, true);
    newAjax.addEventListener("readystatechange", function() {
        if (newAjax.readyState == 4 && newAjax.status == 200) {
            console.log(newAjax.response);
            action(newAjax.response);
        }
    });
    newAjax.send(json);
}

function closeForm(formElement) {
    formElement.classList.add("close");
}

function showForm(formElement) {
    formElement.classList.remove("close");
}

function login() {
    sendInformation(packInformation(studentForm), "/studentLogin", loginEndAction);
}

function apply() {
    sendInformation(packInformation(studentForm), "/apply", applyEndAction);
}

function adminLogin() {
    sendInformation(packInformation(adminForm), "/adminLogin", adminEndAction);
}

function loginEndAction(response) {
    sessionStorage.student = JSON.parse(response);
}

function applyEndAction(response) {
    loginEndAction(response);
}

function adminEndAction(response) {
    sessionStorage.interview = JSON.parse(response);
}