var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var AjaxPost = /** @class */ (function (_super) {
    __extends(AjaxPost, _super);
    function AjaxPost(url, data, err, wait, next, fail) {
        if (url === void 0) { url = ""; }
        if (data === void 0) { data = "{}"; }
        var _this = _super.call(this) || this;
        _this.url = "";
        _this.error = function () { };
        _this.waiting = function () { };
        _this.success = function () { };
        _this.failed = function () { };
        _this.checkStatus = function (response) { return response["status"] == "success"; };
        _this.url = url || "";
        _this.error = err || (function () { });
        _this.waiting = wait || (function () { });
        _this.success = next || (function () { });
        _this.failed = fail || (function () { });
        _this.open("post", url, true);
        _this.onreadystatechange = function () {
            _this.readyState == 4 && _this.status == 200 ?
                _this.checkStatus(_this.response) ?
                    next(JSON.parse(_this.response))
                    : _this.failed()
                : _this.waiting();
        };
        try {
            _this.send(data);
        }
        catch (err) {
            _this.error();
        }
        return _this;
    }
    return AjaxPost;
}(XMLHttpRequest));
var AjaxData = /** @class */ (function () {
    function AjaxData(url, dataOrigin, getData) {
        this.url = "";
        this.data = "";
        this.dataOrigin = document.querySelector("div");
        this.url = url;
        this.dataOrigin = dataOrigin;
        this.data = getData(this.dataOrigin);
    }
    return AjaxData;
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
var closeForm = function (formElement) {
    formElement.classList.add("close");
};
var showForm = function (formElement) {
    formElement.classList.remove("close");
};
var login = function () {
    var loginData = new AjaxData("", studentForm, function (form) {
        var allInformation = {};
        Array.from(form.elements).forEach(function (item) {
            allInformation[item.name] = item.value;
        });
        return JSON.stringify(allInformation);
    });
    var Ajax = new AjaxPost();
};
var apply = function () {
};
var adminLogin = function () {
};
// let { login, apply, adminLogin, closeForm, showForm } = TW_Login()
// function TW_Login() {
//     let packInformation = (form: HTMLFormElement): string => {
//         let allInformation: Object = {}
//         Array.from(form.elements).forEach((item: HTMLInputElement): void => {
//             item.name != "" ? allInformation[item.name] = item.value : 0
//         })
//         return JSON.stringify(allInformation)
//     }
//     let sendInformation = (json: string, place: string, thenAction: Function): void => {
//         waitingResponse()
//         const newAjax: XMLHttpRequest = new XMLHttpRequest()
//         newAjax.open("post", place, true)
//         // newAjax.setRequestHeader("content-type", "application/json; charset=UTF-8");
//         newAjax.addEventListener("readystatechange", (): void => {
//             if (newAjax.readyState == 4 && newAjax.status == 200) {
//                 thenAction(newAjax.response)
//             } else {
//                 waitingResponse()
//             }
//         })
//         try{
//             newAjax.send(json)
//         }catch(err){
//             alert("服务器好像出了点问题。。。")
//             isClickStudent = false
//         }
//     }
//     let closeForm = (formElement: HTMLElement): void => {
//         formElement.classList.add("close")
//     }
//     let showForm = (formElement: HTMLElement): void => {
//         formElement.classList.remove("close")
//     }
//     // const url :string = "http://176.122.165.147:3000/"
//     const url: string = "http://localhost:30100/"
//     let login = (): void => {
//         let formInformation: Object = JSON.parse(packInformation(studentForm))
//         sendInformation(JSON.stringify(formInformation), url + "studentLogin", loginSuccessAction)
//     }
//     let apply = (): void => {
//         login()
//     }
//     let adminLogin = (): void => {
//         sendInformation(packInformation(adminForm), url + "adminLogin", adminSuccessAction)
//     }
//     let loginSuccessAction = (response: string): void => {
//         // console.log(JSON.parse(JSON.parse(response)))
//         if (JSON.parse(JSON.parse(response)).status == "success") {
//             if (JSON.parse(response).Telephone == "") {
//                 alert("你还未报名，请先报名哦！")
//                 isClickStudent = false
//                 loginOrApply['isClick'] = false
//                 location.reload()
//             }
//             else {
//                 sessionStorage.setItem("student", JSON.parse(response))
//                 if (history.length > 1) {
//                     history.go(-1)
//                 } else {
//                     location.replace("./selection.html")
//                 }
//             }
//         } else {
//             isClickStudent = false
//             alert("账号或密码错误")
//             for (let i in studentForm.elements) {
//                 if (studentForm.elements[i]['name'] == "mm") {
//                     studentForm.elements[i]['value'] = ""
//                 }
//             }
//         }
//     }
//     // let applySuccessAction = (response: string): void => {
//     //     loginSuccessAction(response)
//     // }
//     let adminSuccessAction = (response: string): void => {
//         sessionStorage.interview = JSON.parse(response)
//     }
//     let waitingResponse = () => {
//     }
//     return { login, apply, adminLogin, closeForm, showForm }
// }
