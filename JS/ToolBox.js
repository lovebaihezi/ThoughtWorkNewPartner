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