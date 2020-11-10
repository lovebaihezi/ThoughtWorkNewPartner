var InputContent = document.querySelectorAll(".InformationValue");
var scrollWidth = document.getElementById("scrollBox");
// sessionStorage.setItem("student", "{\"name\":\"abc\",\"id\":\"04193146\",\"Tel\":\"1284932085\",\"way\":\"后台\",\"point\":\"2\"}");
var data1 = sessionStorage.getItem("student");
if (data1 != null && JSON.parse(data1).hasOwnProperty('id')) {
    document.getElementById("Information").style.display = "flex"
    data = JSON.parse(data1);
    InputContent[0].value = data.name || "你还没有报名哦";
    InputContent[1].value = data.id || "";
    InputContent[2].value = data.Tel || "";
    InputContent[3].value = data.way || "";
    console.log(data.InterViewProcess);
    switch (data.InterViewProcess) {
        case "0" || "null" || null:
            scrollWidth.style.width = "38%";
            break;
        case "1":
            scrollWidth.style.width = "66%";
            break;
        case "2":
            scrollWidth.style.width = "100%";
            break;
        default:
            scrollWidth.style.width = "38%";
            break;
    }
} else {
    document.getElementById("Information").style.display = "none";
}
