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
            that.post = "backStageManagement";
        });
    },
    returnPost: function() {
        return this.post;
    }
}
var Post = new postChoose(document.getElementById("leftAngle"), document.getElementById("rightAngle"));
Post.whenCreated();