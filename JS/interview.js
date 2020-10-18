var interviewForm = document.forms[0];
var save = document.getElementById('save');
var inputList = Array.from(document.querySelectorAll('label')).map(function (item) { return item.querySelector('input'); });
inputList.pop();
inputList.pop();
// let student : object = JSON.parse(sessionStorage['student'])
// let interviewer : object = JSON.parse(sessionStorage['interview'])
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
    // document.getElementById("loading").style.display = "block"
};
// let setInformation = ()=>{
//     if(sessionStorage['interview']){
//         (document.getElementById('interview') as HTMLInputElement).value = interviewer['name']
//         alert("你好" + interviewer['name'])
//     }else{
//         location.replace('../HTML/Login.html');
//     }
// }
save.addEventListener("click", function () {
    saveInformation();
});
var saveInformation = function () {
    // sessionStorage.setItem(student['name'],packInformation(interviewForm))
};
