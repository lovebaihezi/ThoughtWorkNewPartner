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
var signForm = document.forms[0];
var url = "http://localhost:3000/";
signForm.addEventListener("submit", function (defaultEvent) {
    defaultEvent.preventDefault();
    sendInformation(packInformation(signForm), url + "Sign", function (response) {
        var res = JSON.parse(response);
        var status = res.status;
        showStatus(status);
    });
});
