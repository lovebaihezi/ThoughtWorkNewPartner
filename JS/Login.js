var LogIn = document.getElementById("LogInButton");
LogIn.onclick = function() {
    InformationStack["Account"].getInformationFromInput();
    InformationStack["Password"].getInformationFromInput();
    InformationStack["Account"].CheckRules = /^\d{6}$/g;
    InformationStack["Password"].CheckRules = /^\w{6,12}$/g;
    InformationStack.createJSONDataForObjectInformation();
};