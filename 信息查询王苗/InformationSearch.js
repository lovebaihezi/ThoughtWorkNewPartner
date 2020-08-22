window.onload=function(){
    var divbg=document.getElementById("divbg");//获取div
    var divbgTwo=document.getElementById("divbgTwo");
    var x1=0;
    var y1=0;
    var x2=0,y2=0;
//    var y=0;//定义垂直方向初始距离
    var divbgTimer=setInterval(moveBg,100);//设置调用这个方法的定时器，100ms调用一次
    function moveBg(){//背景移动函数
            divbg.style.backgroundPositionX=x1+"px";//对div对象的背景图片进行移动
            x1=x1+2;//向右移动
            divbg.style.backgroundPositionY=y1+"px";
            y1=y1+2;//向下移动
    }
    var divbgtimerTwo=setInterval(movebgTwo,100);
    function movebgTwo(){
            divbgTwo.style.backgroundPositionX=x2+"px";//对div对象的背景图片进行移动
            x2=x2-2;//向左移动
            divbgTwo.style.backgroundPositionY=y2+"px";
            y2=y2+2;//向下移动
    }


    var myImportant=document.getElementById('myImportant');
    var contentArr="我的信息".split("");
    var content="";
    var index=0;
    var myID=setInterval(function(){
        content += contentArr[index];
        myImportant.innerHTML = content + "_";
        index++;
        if(index === contentArr.length){
        myImportant.innerHTML = content ;
        clearInterval(myID);
        console.log("结束了");
        }
    },500);

    var InformationLi = document.querySelectorAll(".InformationValue");
    var InformationName = document.querySelectorAll(".InformationName");

    for(let i=0;i<InformationLi.length;i++)
    {
        if(InformationName[i].innerHTML=="姓名：")
        {
            InformationLi[i].value="后台导入信息1";
        }
        else if(InformationName[i].innerHTML=="学号：")
        {
            InformationLi[i].value="后台导入信息2";
        }
        else if(InformationName[i].innerHTML=="电话号码：")
        {
            InformationLi[i].value="后台导入信息3";
        }
        else if(InformationName[i].innerHTML=="邮箱：")
        {
            InformationLi[i].value="后台导入信息4";
        }
        else if(InformationName[i].innerHTML=="报名方向：")
        {
            InformationLi[i].value="后台导入信息5";
        }
    }

};
