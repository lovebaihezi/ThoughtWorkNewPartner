window.onload = () => {
    let loginButton = document.getElementById("Submit");
    let leftButton = document.getElementById("leftButton");
    let rightButton = document.getElementById("rightButton");
    formInformation = document.getElementsByTagName("form")[0];
    leftButton.addEventListener("click", () => {
        leftButton.classList.add("on");
        rightButton.classList.remove("on");
        formInformation = document.getElementsByTagName("form")[0];
        formInformation.classList.remove("close");
        document.getElementsByTagName("form")[1].classList.add("close");
    });

    rightButton.addEventListener("click", () => {
        leftButton.classList.remove("on");
        rightButton.classList.add("on");
        formInformation = document.getElementsByTagName("form")[1];
        formInformation.classList.remove("close");
        document.getElementsByTagName("form")[0].classList.add("close");
    });
    let inputList = document.getElementsByTagName("input");
    let JsonDataObject = {};
    let JsonData;
    let AjaxObject;
    let ResponseTextFromServer;
    let ResponseInformationObject;
    document.getElementsByTagName("form")[0].addEventListener("submit", function(formEvent) {
        formEvent.preventDefault();
        for (i = 0; i < formInformation.elements.length - 1; i++) {
            ((i) => {
                JsonDataObject[formInformation.elements[i].name] =
                    formInformation.elements[i].value;
            })(i);
        }
        window[formEvent.submitter.value]();
    }, true);

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
        JsonDataObject.Password = encryptDate(JsonDataObject.Password);
        JsonData = JSON.stringify(JsonDataObject);
    }

    window.APPLY = () => {

    }

    window.IAmADMIN = () => {

    }

    window.RsaKey = null;

    window.receiveRSAKeyAnd = (truePassword) => {
        RsaKey = '';
        let TryConnection = new XMLHttpRequest();
        let fakeSubmit = new XMLHttpRequest();
        TryConnection.open("post", "http://localhost:3000/getRSA", true);
        TryConnection.addEventListener("readystatechange", () => {
            if (TryConnection.status == 200 && TryConnection.readyState == 4) {
                RsaKey = JSON.parse(TryConnection.responseText);
                var rsaKey = new RSAKey();
                rsaKey.setPublic(b64tohex(RsaKey.modulus), b64tohex(RsaKey.exponent));
                var enPassword = hex2b64(rsaKey.encrypt("laserjet200pro"));
                fakeJson = JSON.stringify({
                    "yhm": "04194012",
                    "mm": enPassword,
                });
                var fakeFakeJson = fakeJson.slice(0, fakeJson.indexOf('}')) + "," + "\"mm\":\"" + enPassword + "\"}";
                fakeSubmit.open("post", "http://localhost:3000/Login",
                    true);
                fakeSubmit.addEventListener("readystatechange", () => {

                    if (fakeSubmit.status == 200 && fakeSubmit.readyState == 4) {
                        console.log(fakeSubmit.responseText);
                    }

                });
                fakeSubmit.send(fakeFakeJson);
            }
        });
        TryConnection.send();
    }

    // encryptDate("123456789");

}

function getCookie() {
    // "http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_slogin.html?language=zh_CN&_t=" + new Date().getTime();
}

function encryptDate(truePassword) {

    receiveRSAKeyAnd(truePassword);

}