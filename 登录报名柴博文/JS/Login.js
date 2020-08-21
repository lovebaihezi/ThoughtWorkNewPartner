function postChoose(leftAngle, rightAngle) {
    this.frontEndDevelopment = leftAngle;
    this.backStageManagement = rightAngle;
    this.post = "";
}
postChoose.prototype = {
    constructor: postChoose,
    fillScreen: function(frontEndDevelopment) {
        this.frontEndDevelopment.style.width = "100%";
    },
    whenCreated: function() {
        that = this;
        this.frontEndDevelopment.addEventListener("click", function() {
            // that.fillScreen(that.frontEndDevelopment);
            that.post = "frontEndDevelopment";
        });
        this.backStageManagement.addEventListener("click", function() {
            // that.fillScreen(that.backStageManagement);
            that.post = "backStageManagement";
        });
    },
    returnPost: function() {
        return this.post;
    }
}

function Submit() {
    this.account = "";
    this.password = "";
    this.telePhoneNumber = "";
    this.classInformation = "";
    this.signInStatus = false; //是否已报名
    this.accountLogInStatus = false; //登入信息是否正确
    this.allInformation = undefined;
    this.post = "";
    this.switch = false;
}

//正则检查
//点击上传
//数据检查
//数据检查:
/*
    首先是账号密码
    然后是手机号个数
    然后是Post是否选择!(一般来说正常人都会选了的)
*/

Submit.prototype = {
    check: function(NeedCheck, Rules) {
        return Rules.test(NeedCheck);
    },
    statusAccount: function() {
        return ["account", "password"];
    },
    statusInformation: function() {
        return ["telePhoneNumber", "classInformation"];
    },
    statusAccountCheck: function() {
        return ["account", /^\d{6}$/g];
    },
    statusInformationCheck: function() {
        return ["telePhoneNumber", /^\d{11}$/g];
    },
    warnIncorrect: function() {
        this.clearWrongInformation();
        document.getElementById("information1").placeholder = "错误输入,请重新输入";
        document.getElementById("information1").style["background-color"] = "red";
    },
    clearWrongInformation: function() {
        document.getElementById("information1").value = "";
        document.getElementById("information2").value = "";
    },
    clearWarn: function() {
        document.getElementById("information1").placeholder = "学号";
        document.getElementById("information1").style["background-color"] = "transparent";
    },
    postCanBeChose: function() {
        document.getElementById("CoverBack").style.display = "none";
    },
    frontEndDevelopment: function() {
        return "前端";
    },
    backStageManagement: function() {
        return "后台";
    },
    nameChange: function() {
        document.getElementsByClassName("banner")[1].firstElementChild.innerText = "电话号码:";
        document.getElementById("information1").placeholder = "";
        document.getElementById("information2").placeholder = "";
        document.getElementById("information1").autocomplete = "none";
        document.getElementById("information2").autocomplete = "none";
        document.getElementById("information2").type = "text";
        document.getElementById("clickThenSubmit").value = "报名";
        document.getElementsByClassName("banner")[0].innerText = "请点击两边来选择你的方向";
        document.getElementsByClassName("banner")[2].firstElementChild.innerText = "班级姓名:";
    },
    switchToSignIn: function() { //切换到报名
        this.postCanBeChose();
        this.nameChange();
        this.clearWrongInformation();
    },
    alive: function() {
        var This = this;
        var StatusString = "";
        document.getElementById("clickThenSubmit").onclick = function() {
            if (This.post != "") {
                alert("你已经报过名了哦,不能再次了哦!你选择的方向是" + This[This.post]());
                return;
            }
            This.clearWarn();
            if (This.accountLogInStatus) {
                StatusString = "statusInformationCheck";
                This.getInformation(This["statusInformation"]()[0], This["statusInformation"]()[1]);
            } else {
                StatusString = "statusAccountCheck";
                This.getInformation(This["statusAccount"]()[0], This["statusAccount"]()[1]);
            }
            if (This.check(This[This[StatusString]()[0]], This[StatusString]()[1])) {
                This.backInformation();
                if (This.accountLogInStatus) {
                    // TODO: Bug happened! 点击报名后,会再次
                    if (StatusString == "statusAccountCheck") {
                        This.clickAnimation();
                        This.switchToSignIn();
                    } else {
                        This.post = Post.post;
                        if (This.post == "") {
                            alert("你还未选择方向!!!");
                        }
                        This.backInformation();
                    }
                }
            } else {
                This.warnIncorrect();
            }
        }
    },
    clickAnimation: function() {
        document.getElementsByClassName("square")[0].classList.add("backStageAnimation");
    }, //数据OK才开始动画,并且要跳转到下一个,status都要改
    getInformation: function(information1, information2) {
        this[information1] = document.getElementById("information1").value;
        this[information2] = document.getElementById("information2").value;
    },
    setInformation: function() {
        this.allInformation = {
            "account": this.account,
            "password": this.password,
            "telePhoneNumber": this.telePhoneNumber,
            "classInformation": this.classInformation,
            "post": this.post,
            "signInStatus": this.signInStatus
        };
    },
    setLoginStatus: function() {
        this.accountLogInStatus = true;
    },
    backLoginInformation: function() {

    },
    backInformation: function() {
        this.setInformation();
        if (true) {
            this.setLoginStatus();
        }
    }
}

var Post = new postChoose(document.getElementById("leftAngle"), document.getElementById("rightAngle"));
Post.whenCreated();
var submitInformation = new Submit();
submitInformation.alive();
console.log(submitInformation);