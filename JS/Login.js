window.onload = () => {
    let loginButton = document.getElementById("Submit");
    let leftButton = document.getElementById("leftButton");
    let rightButton = document.getElementById("rightButton");
    formInformation = document.getElementsByTagName("form")[0];
    leftButton.addEventListener("click", () => {
        leftButton.classList.remove("on");
        rightButton.classList.add("on");
        formInformation = document.getElementsByTagName("form")[0];
        formInformation.classList.remove("close");
        document.getElementsByTagName("form")[1].classList.add("close");
    });

    rightButton.addEventListener("click", () => {
        leftButton.classList.add("on");
        rightButton.classList.remove("on");
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
                JsonDataObject[formInformation.elements[i].name] = formInformation.elements[i].value;
            })(i);
        }
        AjaxObject = new XMLHttpRequest();
        window[formEvent.submitter.value]();

    }, true);

    document.getElementsByTagName("form")[1].addEventListener("submit", function(formEvent) {
        formEvent.preventDefault();
        for (i = 0; i < formInformation.elements.length - 1; i++) {
            ((i) => {
                JsonDataObject[formInformation.elements[i].name] = formInformation.elements[i].value;
            })(i);
        }
        AjaxObject = new XMLHttpRequest();
        window[formEvent.submitter.value]();

    }, true);

    window.LOGIN = () => {
            JsonDataObject.Password = encryptDate(JsonDataObject.Password);
            JsonData = JSON.stringify(JsonDataObject);
        } //最后再来

    window.APPLY = () => {

    }

    window.IAmADMIN = () => {

    }
    encryptDate();
}

function getCookie() {
    // "http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_slogin.html?language=zh_CN&_t=" + new Date().getTime();
}

function encryptDate() {
    // let RsaAjax = new XMLHttpRequest();
    // // http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_getPublicKey.html
    // let rsa = new RSAKey();
    // RsaAjax.open("get", "http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_getPublicKey.html?time=" + new Date().getTime(), false);
    // RsaAjax.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36");
    // RsaAjax.addEventListener("readystatechange", () => {
    //     if (RsaAjax.readyState == 4 && RsaAjax.status == 200) {
    //         console.log(RsaAjax.response);
    //     }
    // });
    // RsaAjax.send();
    let TryConnection = new XMLHttpRequest();
    TryConnection.open("get", "https://lqxclqxc.com/ExpressWEB/ExpressWEB.js", true);
    TryConnection.addEventListener("readystatechange", () => {
        if (TryConnection.status == 200 && TryConnection.readyState == 4) {
            console.log("Response:" + TryConnection.response);
        } else {
            console.log(TryConnection.status + " | " + TryConnection.readyState);
        }
    });
    TryConnection.send();
}