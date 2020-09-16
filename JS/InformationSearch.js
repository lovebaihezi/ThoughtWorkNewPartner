window.onload=function(){
    var InputContent = document.querySelectorAll(".InformationValue");
    var scrollWidth = document.getElementById("scrollBox");
    
    var searchURL = window.location.search;
    var myURL = searchURL.substring(2);

    var JSON_URL = JSON.parse(myURL);

    InputContent[0].value = JSON_URL.name;
    InputContent[1].value = JSON_URL.studentNumber;
    InputContent[2].value = JSON_URL.telephoneNumber;
    InputContent[3].value = JSON_URL.eMail;
    InputContent[4].value = JSON_URL.direction;
    switch (JSON_URL.prozess) {
        case "0":scrollWidth.style.width="0";break;
        case "1":scrollWidth.style.width="10%";break;
        case "2":scrollWidth.style.width="38%";break;
        case "3":scrollWidth.style.width="66%";break;
        case "4":scrollWidth.style.width="100%";break;
    }
};