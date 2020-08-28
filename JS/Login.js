var LogIn = document.getElementById("LogInButton");
LogIn.onclick = function() {
    InformationStack["Account"].getInformationFromInput();
    InformationStack["Password"].getInformationFromInput();
    InformationStack["Account"].CheckRules = /^\d{6}$/g;
    InformationStack["Password"].CheckRules = /^\w{6,12}$/g;
    InformationStack.createJSONDataForObjectInformation();
};

function reqListener() {
    console.log(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "http://localhost:3000");
oReq.send();