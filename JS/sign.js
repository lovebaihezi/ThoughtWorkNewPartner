window.onload = () => {
    let studentID = document.getElementById("ID");
    let sendID = new XMLHttpRequest();
    sendID.open("post", "http://localhost:3000/sign", true);
    sendID.addEventListener("readystatechange", () => {
        if (sendID.status == 200 && sendID.readyState == 4) {
            if (sendID.responseText == 1) {
                alert("success");
            } else {
                alert("you have not apply yet!");
            }
        }
    });
    sendID.send(studentID.value);
}