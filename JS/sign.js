window.onload = () => {
    let studentID = document.getElementById("ID");
    let sendID = new xmlHTTPRequest();
    sendID.open("get","",true);
    sendID.addEventListener("readystatechange",()=>{
        if(sendID.status == 302 && sendID.readyState == 4)
        {
            alert("Success");
        }
    });
}
