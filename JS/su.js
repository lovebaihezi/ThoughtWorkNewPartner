// Copyright (c) chai bo wen LQXC All rights reserved.
window.onload = () => {
    let interview = document.getElementById("Search");
    interview.isClick = false;
    interview.addEventListener("click",
        () => {
            if (interview.isClick) {
                return;
            }
            interview.isClick = true;
            let ID = document.getElementById("searchByNumber").value;
            let sendID = new XMLDocument();
            sendID.open("post", "http://localhost:3000/studentInterview", true);
            sendID.onreadystatechange = () => {
                if (sendID.status == 200 && sendID.readyState == 4) {
                    sessionStorage.student = JSON.parse(sendID.responseText);
                    alert("find it!");
                }
            }
            sendID.send(ID);
        });
}