if (sessionStorage.student) {
    if (sessionStorage.interview) {
        location.href = "./su.html";
    }
    else {
        try {
            history.go(-1);
        }
        catch (error) {
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
var isClickStudent = false;
var isClickAdmin = false;
loginOrApply.addEventListener("click", function () {
    loginOrApply['isClick'] = true;
    loginOrApply.classList.add("close");
    extraForm.style.display = "none";
    document.getElementById("Telephone").removeAttribute("required");
    document.getElementById("Choose").removeAttribute("required");
});
studentForm.addEventListener("submit", function (formEvent) {
    formEvent.preventDefault();
    if (isClickStudent) {
        return;
    }
    else {
        isClickStudent = true;
        if (loginOrApply['isClick']) {
            login();
        }
        else {
            apply();
        }
    }
});
adminForm.addEventListener("submit", function (formEvent) {
    formEvent.preventDefault();
    if (isClickAdmin) {
        return;
    }
    else {
        adminLogin();
    }
});
changeToAdminLogin.addEventListener("click", function () {
    changeToAdminLogin.classList.add("on");
    changeToStudentApplyOrLogin.classList.remove("on");
    closeForm(studentForm);
    showForm(adminForm);
});
changeToStudentApplyOrLogin.addEventListener("click", function () {
    changeToAdminLogin.classList.remove("on");
    changeToStudentApplyOrLogin.classList.add("on");
    showForm(studentForm);
    closeForm(adminForm);
});
function packInformation(form) {
    var allInformation = {};
    for (var i = 0; i < form.elements.length - 1; i++) {
        allInformation[form.elements[i]['name']] = form.elements[i]['value'];
    }
    return JSON.stringify(allInformation);
}
function sendInformation(json, place, thenAction) {
    var newAjax = new XMLHttpRequest();
    newAjax.open("post", place, true);
    newAjax.addEventListener("readystatechange", function () {
        if (newAjax.readyState == 4 && newAjax.status == 200) {
            thenAction(newAjax.response);
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
    sendInformation("", "http://localhost:3000/getData", loginAction);
}
function apply() {
    login();
}
function adminLogin() {
    sendInformation(packInformation(adminForm), "http://localhost:3000/adminLogin", adminSuccessAction);
}
// function getDataSuccessAction(response: string): void {
//     sendInformation(packInformation(studentForm), "http://localhost:3000/studentLogin", loginSuccessAction);
// }
function loginAction(response) {
    var rsaKey = JSON.parse(response);
    var formInformation = JSON.parse(packInformation(studentForm));
    formInformation['mm'] = encryptPassWord(formInformation['mm'], rsaKey);
    formInformation['mm'] = [formInformation['mm'], formInformation['mm']];
    sendInformation(JSON.stringify(formInformation), "http://localhost:3000/studentLogin", loginSuccessAction);
}
// function applyAction(response: string): void {
// }
function loginSuccessAction(response) {
    if (JSON.parse(response).status == "success") {
        if (JSON.parse(response).Telephone == "") {
            alert("你还未报名，请先报名哦！");
            isClickStudent = false;
            loginOrApply['isClick'] = false;
            location.reload();
        }
        else {
            sessionStorage.student = JSON.parse(response);
            try {
                history.go(-1);
            }
            catch (error) {
                location.replace("../HTML/selection.html");
            }
        }
    }
    else {
        isClickStudent = false;
        alert("账号或密码错误");
        for (var i in studentForm.elements) {
            if (studentForm.elements[i]['name'] == "mm") {
                studentForm.elements[i]['value'] = "";
            }
        }
    }
}
function applySuccessAction(response) {
    loginSuccessAction(response);
}
function adminSuccessAction(response) {
    sessionStorage.interview = JSON.parse(response);
}
function encryptPassWord(truePassword, encryptModule) {
    var rsa = new RSAKey();
    rsa.setPublic(b64tohex(encryptModule['modulus']), b64tohex(encryptModule['exponent']));
    var enPassword = hex2b64(rsa.encrypt(truePassword));
    return enPassword;
}
