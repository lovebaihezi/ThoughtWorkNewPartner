window.onload=function(){
/*    var InputContent = document.querySelectorAll(".InformationValue");
    var scrollWidth = document.getElementById("scrollBox");
    
    //1.创建对象
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    //2.初始化，设置类型与url
    xhr.open("GET","http://127.0.0.1:8000/json-server");
    //3.发送,把参数传给服务器
    xhr.send();
    //4.事件绑定
    xhr.onreadystatechange = function(){
        //判断服务器返回所有结果
        if(xhr.readyState === 4){
            //判断状态码
            if(xhr.status >= 200 && xhr.status<300){
                //处理服务端返回结果
                InputContent[0].value = xhr.response.name;
                InputContent[1].value = xhr.response.studentNumber;
                InputContent[2].value = xhr.response.telephoneNumber;
                InputContent[3].value = xhr.response.eMail;
                InputContent[4].value = xhr.response.direction;
                switch (xhr.response.prozess) {
                    case "0":scrollWidth.style.width="0";break;
                    case "1":scrollWidth.style.width="10%";break;
                    case "2":scrollWidth.style.width="38%";break;
                    case "3":scrollWidth.style.width="66%";break;
                    case "4":scrollWidth.style.width="100%";break;
                }
            }
        }
    };

*/
    var InputContent = document.querySelectorAll(".InformationValue");
    var scrollWidth = document.getElementById("scrollBox");
    
};