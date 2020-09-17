// Copyright (c) chai bo wen LQXC All rights reserved.
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
    let NewDefault = (formEvent) => {
        formEvent.preventDefault();
        for (i = 0; i < formInformation.elements.length - 1; i++) {
            ((i) => {
                JsonDataObject[formInformation.elements[i].name] = formInformation.elements[i].value;
            })(i);
        }
        AjaxObject = new XMLHttpRequest();
        window[formEvent.submitter.value]();
    }
    document.getElementsByTagName("form")[0].addEventListener("submit", NewDefault(form), true);

    document.getElementsByTagName("form")[1].addEventListener("submit", NewDefault(form), true);

    window.LOGIN = () => {
            JsonDataObject.Password = encryptDate(JsonDataObject.Password);
            JsonData = JSON.stringify(JsonDataObject);
        } //最后再来

    window.APPLY = () => {

    }

    window.IAmADMIN = () => {

    }
}

function encryptDate(StringObject) {
    let RsaAjax = new XMLHttpRequest();
    let rsa = new RSAKey();
    RsaAjax.open("http://www.zfjw.xupt.edu.cn/jwglxt/xtgl/login_getPublicKey.html?time=" + new Date().getTime(), "post", false);
    RsaAjax.addEventListener("readystatechange", () => {

    });
    RsaAjax.send();
}