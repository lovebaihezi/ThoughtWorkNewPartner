// Copyright (c) chai bo wen LQXC All rights reserved.
window.onload = () => {
    let interview = document.getElementById("");
    interview.isClick = false;
    interview.addEventListener("click",
        ()=>{
            if(interview.isClick)
            {
                return;
            }
            interview.isClick=true;
            let ID = document.getElementById("studentID").value;
            let sendID = new xmlHTTPRequest();
            sendID.open("post","http://localhost:3000/studentInterview",true);
            sendID.onreadystatechange = () = {
                if(sendID.status == 200 && sendID.readyState == 4){
                    document.cookie.student =JSON.parse(sendID.responseText);
                    alert("find it!");
                }
            }
            sendID.send(ID);
        });
}
