window.onload = () => {
    let loginButton = document.getElementById("Submit");
    let formInformation = document.getElementsByTagName("form")[0];
    let inputList = document.getElementsByTagName("input");
    let JsonDataObject = {};
    let JsonData;
    let AjaxObject;
    let ResponseTextFromServer;
    let ResponseInformationObject;
    formInformation.addEventListener("submit", (formEvent) => {
        formEvent.preventDefault();
        for (i = 0; i < formInformation.elements.length - 1; i++) {
            ((i) => {
                JsonDataObject[formInformation.elements[i].name] = formInformation.elements[i].value;
            })(i);
        }
        AjaxObject = new XMLHttpRequest();
        window[form.submitter.value]();
    }, false);

    window.LOGIN = () => {
            JsonDataObject.Password = encryptDate(JsonDataObject.Password);
            JsonData = JSON.stringify(JsonDataObject);
        } //最后再来

    window.APPLY = () => {

    }
}

function encryptDate(StringObject) {

}