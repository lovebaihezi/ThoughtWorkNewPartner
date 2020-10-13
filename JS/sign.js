var packInformation = function (form) {
    var allInformation = {};
    Array.from(form.elements).forEach(function (item) {
        item.name != "" ? allInformation[item.name] = item.value : 0;
    });
    return JSON.stringify(allInformation);
};
var sendInformation = function (json, place, thenAction) {
    waitingResponse();
    var newAjax = new XMLHttpRequest();
    newAjax.open("post", place, true);
    // newAjax.setRequestHeader("content-type", "application/json; charset=UTF-8");
    newAjax.addEventListener("readystatechange", function () {
        if (newAjax.readyState == 4 && newAjax.status == 200) {
            thenAction(newAjax.response);
        }
        else {
            waitingResponse();
        }
    });
    try {
        newAjax.send(json);
    }
    catch (error) {
        alert(error);
    }
};
var waitingResponse = function () {
    var submit = document.getElementById("SignId");
    submit.value = "等待响应中";
};
var signForm = document.forms[0];
var studentID = signForm.querySelector("input");
var url = "";
signForm.addEventListener("submit", function (defaultEvent) {
    defaultEvent.preventDefault();
    sendInformation(JSON.stringify({ studentID: studentID.value }), url, function (response) {
        JSON.parse(JSON.parse(response)).status == "success"
            ? alert("签到成功")
            : alert("签到失败");
    });
});
