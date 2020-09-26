window.onload = () => {

    // if (sessionStorage.student) {
    // location.href = "../HTML/informationSearch.html";
    // } else {
    var loginButton = document.getElementById("Submit");
    var leftButton = document.getElementById("leftButton");
    var rightButton = document.getElementById("rightButton");
    formInformation = document.getElementsByTagName("form")[0];
    var otherInformation = document.getElementById("otherInformation");
    var showApplyInformation = document.getElementById("showApplyButton");
    showApplyInformation.onclick = function() {
        otherInformation.style.display = "block";
        showApplyInformation.style.display = "none";
    }
    leftButton.addEventListener("click", () => {
        leftButton.classList.add("on");
        rightButton.classList.remove("on");
        otherInformation.classList.remove("close");
        formInformation = document.getElementsByTagName("form")[0];
        formInformation.classList.remove("close");
        document.getElementsByTagName("form")[1].classList.add("close");
    });

    rightButton.addEventListener("click", () => {
        leftButton.classList.remove("on");
        rightButton.classList.add("on");
        formInformation = document.getElementsByTagName("form")[1];
        formInformation.classList.remove("close");
        otherInformation.classList.add("close");
        document.getElementsByTagName("form")[0].classList.add("close");
    });
    var JsonDataObject = {};
    var JsonData;
    var AjaxObject;
    document.getElementById("normalSubmit").addEventListener("click", () => {
        for (var i = 0; i < formInformation.elements.length - 1; i++) {
            ((i) => {
                JsonDataObject[formInformation.elements[i].name] =
                    formInformation.elements[i].value;
            })(i);
        }
        window.LOGIN();
    });

    document.getElementsByTagName("form")[1].addEventListener("submit", function(formEvent) {
        formEvent.preventDefault();
        for (var i = 0; i < formInformation.elements.length - 1; i++) {
            ((i) => {
                JsonDataObject[formInformation.elements[i].name] =
                    formInformation.elements[i].value;
            })(i);
        }
        window[formEvent.submitter.value]();
    }, true);

    window.LOGIN = () => {
        // receiveRSAKeyAnd();
        AjaxObject = new XMLHttpRequest();
        AjaxObject.open("post", "studentLogin", true);
        AjaxObject.onreadystatechange = function() {
            if (AjaxObject.readyState == 4 && AjaxObject.status == 200) {
                responseParse = JSON.parse(AjaxObject.responseText);
                if (responseParse.status == "failed") {
                    sessionStorage.student = JSON.stringify(JsonDataObject);
                    location.href == "http://www.baidu.com";
                } else {
                    for (var i = 0; i < 2; i++) {
                        ((i) => {
                            formInformation.elements[i].value = "";
                        })(i);
                    }
                    formInformation.elements[0].placeHolder = "账号或密码错误哦";
                }
            }
        }
        AjaxObject.send(JsonDataObject);
    }

    window.IAmADMIN = () => {
        AjaxObject = new XMLHttpRequest();
        AjaxObject.open("post", "/admin-login", true);
        AjaxObject.onreadystatechange = function() {
            if (AjaxObject.readyState == 4 && AjaxObject.status == 200) {
                if (this.responseText == 1) {
                    sessionStorage.interview = JSON.stringify(JsonDataObject);
                } else {
                    for (var i = 0; i < 2; i++) {
                        ((i) => {
                            formInformation.elements[i].value = "";

                        })(i);
                    }
                    formInformation.elements[0].placeHolder = "账号或密码错误哦";
                }
            } else {
                alert("网络不太好哦，刷新试试吧");
            }
        }
    }
}