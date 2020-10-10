window.onload=function(){
    var InputContent = document.querySelectorAll(".InformationValue");
    var scrollWidth = document.getElementById("scrollBox");
    
    // var xhr = new XMLHttpRequest();
    // xhr.open('post','http://176.122.165.147:3000/studentLogin',true);
    // // xhr.send('');
    // xhr.onreadystatechange = function(){
    //     if(xhr.readyState==4 && xhr.status==200){
            var storage = window.localStorage;
            var data = {
                name:'123',
                studentNumber:'1234',
                telephoneNumber:'12345',
                eMail:'123456',
                direction:'后台',
                prozess:"4"
            };
            // 存储方式为如下，将 json 转化为字符串再存入:
            localStorage.setItem("data", JSON.stringify(data));
            // 使用
            var data = localStorage.getItem("data");
            data = JSON.parse(data);   
            console.log(data); 
            
            InputContent[0].value = data.name;
            InputContent[1].value = data.studentNumber;
            InputContent[2].value = data.telephoneNumber;
            InputContent[3].value = data.eMail;
            InputContent[4].value = data.direction;
            switch (data.prozess) {
                case "0":scrollWidth.style.width="0";break;
                case "1":scrollWidth.style.width="10%";break;
                case "2":scrollWidth.style.width="38%";break;
                case "3":scrollWidth.style.width="66%";break;
                case "4":scrollWidth.style.width="100%";break;
            }
         }
//     };
// };