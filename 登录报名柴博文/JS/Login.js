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
    this.signInStatus = false;
    this.accountLogInStatus = false;
    this.allInformation = undefined;
}

//正则检查
//点击上传
//数据检查

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
        return ["telePhoneNumber", /^\d{13}$/g];
    },
    alive: function() {
        var This = this;
        var StatusString = "";
        document.getElementById("clickThenSubmit").onclick = function() {
            if (This.accountLogInStatus) {
                This.getInformation(This["statusInformation"]()[0], This["statusInformation"]()[1]);
            } else {
                This.getInformation(This["statusAccount"]()[0], This["statusAccount"]()[1]);
            }
            This.setInformation();
            This.clickAnimation();
        }
    },
    clickAnimation: function() {
        if (this.loginStatus) {

        }
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
            "loginStatus": this.signInStatus
        };
    },
    setStatus: function() {
        this.signInStatus = true;
    },
    backInformation: function() {

    }
}

var Post = new postChoose(document.getElementById("leftAngle"), document.getElementById("rightAngle"));
Post.whenCreated();
var submitInformation = new Submit();
submitInformation.alive();