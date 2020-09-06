
 var str = " 在这里你将学到三大核心知识"
    var i = 0;
    function typing(){
      var divTyping = document.getElementById('divTyping')
      if(i<=str.length){
        divTyping.innerHTML = str.slice(0,i++) + "-";
        setTimeout("typing()",200)
      }else{
        divTyping.innerHTML = str;
      }
    }
    typing();
