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
    newAjax.send(json);
};
var waitingResponse = function () {
};
var searchForm = document.getElementsByClassName('Login')[0].querySelector('form');
searchForm.addEventListener("submit", function (defaultEvent) {
    defaultEvent.preventDefault();
    console.log(packInformation(searchForm));
    sendInformation(packInformation(searchForm), "", function (response) {
        var student = JSON.parse(JSON.parse(response));
        if (student['status'] == "success") {
            sessionStorage.setItem(student['name'], JSON.stringify(student));
            location.href = "../HTML/interview.html";
        }
        else {
            alert("查无此人！");
        }
    });
});
