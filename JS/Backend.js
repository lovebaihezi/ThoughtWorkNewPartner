window.onload = function () {
  var myDiv = document.getElementById("myDiv");
  var contentArr = "后台，指网站后台，有时也称为网站管理后台，是指用于管理网站前台的一系列操作，如：产品、企业信息的增加、更新、删除等。".split("");
  var content = "";
  var index = 0;
  var ID = setInterval(function () {
  content += contentArr[index];
  myDiv.innerHTML = content + "_";
  index++;
  if(index === contentArr.length){
   myDiv.innerHTML = content ;
   clearInterval(ID);
   console.log("结束了");
  }
  },100);
 }