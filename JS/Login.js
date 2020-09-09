window.onload = function() {
    let loginButton = document.getElementById("Submit");
    let formInformation = document.getElementsByTagName("form")[0];
    let inputList = document.getElementsByTagName("input");
    let JsonDataObject = {};
    let JsonData;
    let AjaxObject = new XMLHttpRequest();
    formInformation.addEventListener("submit", function(form) {
        for (i = 0; i < formInformation.elements.length - 1; i++) {
            (function(i) {
                JsonDataObject[formInformation.elements[i].name] = formInformation.elements[i].value;
            })(i);
        }
        JsonData = JSON.stringify(JsonDataObject);
        form.preventDefault();
        window[form.submitter.value]();
    }, false);

    window.LOGIN = function() {
        location.replace("./Apply.html");
    }

    window.APPLY = function() {
        location.replace("./InformationSearch.html");
    }
}