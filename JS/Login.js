window.onload = () => {
    let loginButton = document.getElementById("Submit");
    let leftButton = document.getElementById("leftButton");
    let rightButton = document.getElementById("rightButton");
    formInformation = document.getElementsByTagName("form")[0];
    let otherInformation = document.getElementById("otherInformation");
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
    let inputList = document.getElementsByTagName("input");
    let JsonDataObject = {};
    let JsonData;
    let AjaxObject;
    let ResponseTextFromServer;
    let ResponseInformationObject;
    document.getElementById("normalSubmit").addEventListener("click", () => {
        for (i = 0; i < formInformation.elements.length - 1; i++) {
            ((i) => {
                JsonDataObject[formInformation.elements[i].name] =
                    formInformation.elements[i].value;
            })(i);
        }
        window.LOGIN();
    });

    document.getElementsByTagName("form")[1].addEventListener("submit", function(formEvent) {
        formEvent.preventDefault();
        for (i = 0; i < formInformation.elements.length - 1; i++) {
            ((i) => {
                JsonDataObject[formInformation.elements[i].name] =
                    formInformation.elements[i].value;
            })(i);
        }
        window[formEvent.submitter.value]();
    }, true);

    window.LOGIN = () => {
        receiveRSAKeyAnd();
    }

    window.IAmADMIN = () => {

    }

    window.RsaKey = null;

    window.receiveRSAKeyAnd = () => {
        RsaKey = '';
        let TryConnection = new XMLHttpRequest();
        TryConnection.open("post", "http://localhost:3000//getRSA", true); //GET RSA
        TryConnection.addEventListener("readystatechange", () => {
            if (TryConnection.status == 200 && TryConnection.readyState == 4) {
                RsaKey = JSON.parse(TryConnection.responseText);
                let password = encryptDate(JsonDataObject['mm'], RsaKey);
                console.log(password);
                document.getElementById("mm").value = password;
                console.log(document.getElementById("mm").value);
                document.getElementById("password").value = password;
                var submitAction = setTimeout(() => { document.forms[0].submit(); }, 100);

            }
        });
        TryConnection.send();
        clearTimeout(submitAction);
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