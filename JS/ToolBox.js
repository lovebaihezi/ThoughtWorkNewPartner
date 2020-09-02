const upToTop = document.getElementById("BackToTop");
window.onscroll = function() {
    let ScrollHeight = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop);
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
    const This = this;
    this.Subject.addEventListener(Action, function() { TargetAction(This.ActionObject) });
}

const wantToLogin = new ToolBox(document.getElementById("logIn"), document.getElementById("logInAndApply"));
const closeLoginAndApply = new ToolBox(document.getElementById("closeLoginAndApply"), document.getElementById("logInAndApply"));
const showPad = new ToolBox(document.getElementById("PadBox"), document.getElementById("PadBox"));
const shrinkPad = new ToolBox(document.getElementById("closePad"), document.getElementById("PadBox"));


wantToLogin.addAction("click", function(A) { A.classList.remove("close"); });
closeLoginAndApply.addAction("click", function(A) { A.classList.add("close"); });
showPad.addAction("click", function(A) { A.classList.remove("childAbsolute"); });
shrinkPad.addAction("click", function(A) {
    A.classList.add("childAbsolute");
    console.log(A.classList);
});