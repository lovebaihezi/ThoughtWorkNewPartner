if (sessionStorage.student) {
    if (sessionStorage.interview) {
        location.href = "./su.html";
    } else {
        if (history.length > 1) {
            history.go(-1);
        } else {
            location.replace("./selection.html");
        }
    }
}