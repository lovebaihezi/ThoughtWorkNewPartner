window.onload = function() {
    let loginButton = document.getElementById("Submit");
    let formInformation = document.getElementsByTagName("form")[0];
    let inputList = document.getElementsByTagName("input");
    let JsonDataObject = {};
    let JsonData;
    let AjaxObject;
    let ResponseTextFromServer;
    let ResponseInformationObject;
    formInformation.addEventListener("submit", function(form) {
        form.preventDefault();
        for (i = 0; i < formInformation.elements.length - 1; i++) {
            (function(i) {
                JsonDataObject[formInformation.elements[i].name] = formInformation.elements[i].value;
            })(i);
        }
        JsonData = JSON.stringify(JsonDataObject);
        try {
            AjaxObject = new XMLHttpRequest();
        } catch (err) {
            AjaxObject = new ActiveXObject("Microsoft.XMLHTTP ");
            alert("Your explorer is too old to use,try firefox please");
        }
        window[form.submitter.value]();
    }, false);

    window.LOGIN = function() {
        AjaxObject.open("post", "https://lqxclqxc.com/Test.php", true);
        // AjaxObject.setRequestHeader("Content-Type", "application/json");
        AjaxObject.onreadystatechange = function() {
            if (AjaxObject.readyState == 4 && AjaxObject.status == 200) {
                ResponseTextFromServer = AjaxObject.responseText;
                ResponseInformationObject = JSON.parse(ResponseTextFromServer);
                ResponseInformationObject.status = 2;
                // 0 1 2
                // 登陆失败 登录但未注册 登录而且已经注册
                switch (ResponseInformationObject.status) {
                    case 0:
                        {
                            for (i = 0; i < formInformation.elements.length - 1; i++) {
                                (function(i) {
                                    formInformation.elements[i].value = null;
                                })(i);
                            }
                            location.reload();
                            break;
                        }
                    case 1:
                        {
                            location.replace("./Apply.html");
                            break
                        }
                    case 2:
                        {
                            AjaxObject.open("get", "./InformationSearch.html?i=" + ResponseTextFromServer, true);
                            AjaxObject.onreadystatechange = function() {
                                if (AjaxObject.readyState == 4 && AjaxObject.status == 200) {
                                    // if (AjaxObject.responseText == 1) {
                                    location.replace("./InformationSearch.html?i=" + ResponseTextFromServer);
                                    // }
                                }
                            }
                            AjaxObject.send();
                            break;
                        }
                }
            }
        }
        AjaxObject.send(JsonData);
    }

    window.APPLY = function() {
        location.replace("./InformationSearch.html");
    }

}