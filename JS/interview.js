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
var interviewForm = document.forms[0];
var save = document.getElementById("save");
var inputList = Array.from(document.querySelectorAll("label")).map(function (item) { return item.querySelector("input"); });
inputList.pop();
inputList.pop();
var a = {
    id: "无数据",
    name: "无数据",
    Tel: "无数据",
    subject: "无数据",
    way: "无数据",
    point: "无数据",
    Interviewer: "无数据",
    InterViewProcess: "无数据",
    comment: "无数据"
};
var student = JSON.parse(sessionStorage.getItem("student") || JSON.stringify(a));
var interviewer = JSON.parse(sessionStorage.getItem("interview") || JSON.stringify({ name: "null" }));
// import { AjaxPost,AjaxData } from "./ajaxPost";
// const AjaxPost = require("./ajaxPost")
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
            document.getElementById("waiting").style.display = "none";
            thenAction(newAjax.response);
        }
        else {
            waitingResponse();
        }
    });
    newAjax.send(json);
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
var response = /** @class */ (function () {
    function response() {
        this.status = "";
        this.ServerType = "";
        this.html = "";
    }
    return response;
}());
var information = /** @class */ (function (_super) {
    __extends(information, _super);
    function information(newStudent) {
        var _this = _super.call(this) || this;
        _this.student = [];
        _this.interview = "";
        return _this;
    }
    return information;
}(Object));
var data;
var interview = document.forms[0];
var url = "http://localhost:3000/";
interview.addEventListener("submit", function (defaultEvent) {
    defaultEvent.preventDefault();
    sendInformation(packInformation(interview), url + "interview", function (response) {
        var res = JSON.parse(response);
        var status = res.status;
        if (status == "success") {
            showStatus(status, function () {
                sessionStorage.setItem("student", response);
                location.href = "../HTML/Su.html";
            });
        }
        else {
            showStatus(status);
        }
    });
});
var setInformation = function () {
    if (sessionStorage.getItem("interview")) {
        document.getElementById("interview").value = interviewer["name"];
        alert("你好" + interviewer["name"]);
    }
    else {
        // location.replace("../HTML/Login.html");
    }
    var _loop_1 = function (i) {
        inputList.forEach(function (item) {
            if (item.name == i) {
                item.value = student[i];
            }
        });
    };
    for (var i in student) {
        _loop_1(i);
    }
};
setInformation();
save.addEventListener("click", function () {
    saveInformation();
});
var saveInformation = function () {
    sessionStorage.setItem("student", packInformation(interview));
    document.getElementById("success").querySelector("div").innerHTML = "保存成功";
    showStatus("success");
};
