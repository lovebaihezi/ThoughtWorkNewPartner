if (sessionStorage.student) {
    if (sessionStorage.interview) {
        location.href = "./su.html";
    }
    else {
        if (history.length > 1) {
            history.go(-1);
        }
        else {
            location.replace("./selection.html");
        }
    }
}
// import { AjaxPost,AjaxData } from "./ajaxPost"
// const AjaxPost = require('./ajaxPost')
// const AjaxData = require('./ajaxPost')
// let timeout = 1000;
// class AjaxPost extends XMLHttpRequest {
//     url: string = ""
//     error: Function = (): void => {
//         document.getElementById("error").style.display = "flex"
//         document.getElementById("error").onclick = () => { document.getElementById("error").style.display = "none" }
//     }
//     waiting: Function = (): void => {
//         document.getElementById("waiting").style.display = "flex"
//         document.getElementById("waiting").onclick = () => { document.getElementById("waiting").style.display = "none" }
//     }
//     success: Function = (): void => {
//         document.getElementById("success").style.display = "flex"
//         document.getElementById("success").onclick = () => { document.getElementById("success").style.display = "none" }
//     }
//     failed: Function = (): void => {
//         document.getElementById("failed").style.display = "flex"
//         document.getElementById("failed").onclick = () => { document.getElementById("failed").style.display = "none" }
//     }
//     checkStatus: Function = (response: object): boolean => {
//         return response["status"] == "success"
//     }
//     constructor(url: string , data: string , err?: Function, wait?: Function, next?: Function, fail?: Function) {
//         super();
//         this.url = url || ""
//         let This = this
//         sessionStorage.setItem("savedInformation",data)
//         const errorNext = (() => {
//             This.error()
//             err ? err() : 0
//         })
//         const waitingNext = (() => {
//             This.waiting()
//             wait ? wait() : 0
//         })
//         const successNext = ((res:object) => {
//             This.success()
//             next ? next(res) : 0
//         })
//         const failedNext = (() => {
//             This.failed()
//             fail ? fail() : 0
//         })
//         this.open("post", url, true)
//         this.onreadystatechange = () => {
//             this.readyState == 4 && this.status == 200 ?
//                 this.checkStatus(this.response) ?
//                     next(JSON.parse(this.response))
//                     : failedNext()
//                 : waitingNext()
//         }
//         try {
//             this.send(data)
//         } catch (err) {
//             this.error()
//         }
//     }
// }
// class AjaxData {
//     url: string = ""
//     data: string = ""
//     dataOrigin: HTMLElement = document.querySelector("div")
//     constructor(url: string, dataOrigin: HTMLElement, getData: Function) {
//         this.url = url
//         this.dataOrigin = dataOrigin
//         this.data = getData(this.dataOrigin)
//     }
// }
var response = /** @class */ (function () {
    function response() {
        this.status = "";
        this.ServerType = "";
        this.html = "";
    }
    return response;
}());
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
    extraForm.style.display = "flex";
    Array.from(extraForm.querySelectorAll("input")).forEach(function (item) {
        item.setAttribute("required", "on");
    });
});
var pro = "login";
studentForm.addEventListener("submit", function (formEvent) {
    formEvent.preventDefault();
    if (isClickStudent) {
        return;
    }
    else {
        isClickStudent = true;
        if (!loginOrApply['isClick']) {
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
// let login: Function = (): void => {
//     const loginData = new AjaxData(
//         "/studentApply", studentForm, (form: HTMLFormElement): string => {
//             let allInformation: Object = {}
//             Array.from(form.elements).forEach((item: HTMLInputElement): void => {
//                 allInformation[item.name] = item.value
//             })
//             return JSON.stringify(allInformation)
//         }
//     );
//     const Ajax = new AjaxPost(
//         loginData.url,loginData.data
//     )
//     console.log(loginData)
//     console.log(Ajax)
// }
// let apply: Function = (): void => {
// }
// let adminLogin: Function = (): void => {
// }
var _a = TW_Login(), login = _a.login, apply = _a.apply, adminLogin = _a.adminLogin, closeForm = _a.closeForm, showForm = _a.showForm;
function TW_Login() {
    var packInformation = function (form) {
        var allInformation = {};
        Array.from(form.elements).forEach(function (item) {
            item.name != "" ? allInformation[item.name] = item.value : 0;
        });
        return JSON.stringify(allInformation);
    };
    var sendInformation = function (json, place, thenAction) {
        waitingResponse();
        // let timeCount = setTimeout(() => {
        //     showStatus("error")
        //     isClickStudent = false
        //     location.reload()
        //     clearTimeout(timeCount)
        // }, 5000);
        // console.log(json)
        var newAjax = new XMLHttpRequest();
        newAjax.open("post", place, true);
        // newAjax.setRequestHeader("content-type", "application/json; charset=UTF-8");
        newAjax.addEventListener("readystatechange", function () {
            if (newAjax.readyState == 4 && newAjax.status == 200) {
                isClickStudent = false;
                document.getElementById("waiting").style.display = "none";
                thenAction(newAjax.response);
            }
            else {
                waitingResponse();
            }
        });
        newAjax.send(json);
    };
    var closeForm = function (formElement) {
        formElement.classList.add("close");
    };
    var showForm = function (formElement) {
        formElement.classList.remove("close");
    };
    // const url :string = "http://176.122.165.147:3000/"
    var url = "http://localhost:3000/";
    var login = function () {
        var formInformation = JSON.parse(packInformation(studentForm));
        sendInformation(JSON.stringify(formInformation), url + "studentLogin", loginCheckAction);
    };
    var apply = function () {
        var formInformation = JSON.parse(packInformation(studentForm));
        sendInformation(JSON.stringify(formInformation), url + "studentApply", loginCheckAction);
    };
    var adminLogin = function () {
        sendInformation(packInformation(adminForm), url + "adminLogin", adminSuccessAction);
    };
    var loginCheckAction = function (response) {
        var res = JSON.parse(response);
        var status = res.status;
        if (status == "success") {
            showStatus(status, function () {
                location.replace('../HTML/index.html');
            });
        }
        else {
            showStatus(status);
        }
    };
    // let applySuccessAction = (response: string): void => {
    //     loginCheckAction(response)
    // }
    var adminSuccessAction = function (response) {
        sessionStorage.interview = JSON.parse(response);
    };
    var waitingResponse = function () {
        document.getElementById("waiting").style.display = "flex";
        // document.getElementById("waiting").onclick = () => { document.getElementById("waiting").style.display = "none" }
    };
    var showStatus = function (status, next) {
        if (next === void 0) { next = function () { }; }
        document.getElementById(status).style.display = "flex";
        document.getElementById(status).onclick = function () {
            document.getElementById(status).style.display = "none";
            next();
        };
    };
    return { login: login, apply: apply, adminLogin: adminLogin, closeForm: closeForm, showForm: showForm };
}
