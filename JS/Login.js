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
        AjaxObject.open("post", "http://localhost:3000/login", true);
        AjaxObject.onreadystatechange = function() {
            if (AjaxObject.readyState == 4 && AjaxObject.status == 200) {
                if (this.responseText == 1) {
                    sessionStorage.student = JSON.stringify(JsonDataObject);
                    history.go(-1);
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

    window.RsaKey = null;

    window.receiveRSAKeyAnd = () => {
        RsaKey = '';
        var TryConnection = new XMLHttpRequest();
        TryConnection.open("post", "http://localhost:3000/getData", true); //GET RSA
        TryConnection.addEventListener("readystatechange", () => {
            if (TryConnection.status == 200 && TryConnection.readyState == 4) {
                RsaKey = JSON.parse(TryConnection.responseText);
                var password = encryptDate(JsonDataObject['mm'], RsaKey);
                document.getElementById("mm").value = password;
                document.getElementById("password").value = password;
                document.forms[0].submit();
            }
        });
        TryConnection.send();
        // }
    }
}

function postToXUPT() {

}

function getCookie() {
    // "http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_slogin.html?language=zh_CN&_t=" + new Date().getTime();
}

function encryptDate(truePassword, RSA) {
    var rsaKey = new RSAKey();
    rsaKey.setPublic(b64tohex(RSA.modulus), b64tohex(RSA.exponent));
    var enPassword = hex2b64(rsaKey.encrypt(truePassword));
    return enPassword;
}