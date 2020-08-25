var upToTop = document.getElementById("BackToTop");
window.onscroll = function() {
    ScrollHeight = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
    if (ScrollHeight >= 500) {
        upToTop.style.visibility = "visible";
    }
    if (ScrollHeight <= 500) {
        upToTop.style.visibility = "hidden";
    }
}

function ToolBox(ElementA, ElementB) {
    this.Subject = ElementA;
    this.ActionObject = ElementB;
}

ToolBox.prototype.addAction = function(Action, TargetAction) {
    var This = this;
    this.Subject.addEventListener(Action, function() { TargetAction(This.ActionObject) });
}

const wantToLogin = new ToolBox(document.getElementById("logIn"), document.getElementById("logInAndApply"));
const closeLoginAndApply = new ToolBox(document.getElementById("closeLoginAndApply"), document.getElementById("logInAndApply"));
wantToLogin.addAction("click", function(A) { A.classList.remove("close"); });
closeLoginAndApply.addAction("click", function(A) { A.classList.add("close") });