$(function () {
    $(".page_4").slideUp();
    $(".page_5").slideUp();
    
    $(".theme_3").on('click', function(){
      // $(".page_3").css({
      //   "height" : 0 ,
      //   "padding" : 0
      // })
      $(".page_3").stop().slideToggle();
      $(".page_4").stop().slideUp();
      $(".page_5").stop().slideUp();
      

    });
    $(".theme_4").on('click', function(){
      // $(".page_3").css({
      //   "height" : 0 ,
      //   "padding" : 0
      // })
      
      $(".page_4").stop().slideToggle();
      $(".page_3").stop().slideUp();
      $(".page_5").stop().slideUp();
      

    });
    $(".theme_5").on('click', function(){
      // $(".page_3").css({
      //   "height" : 0 ,
      //   "padding" : 0
      // })
      $(".page_5").stop().slideToggle();
      $(".page_4").stop().slideUp();
      $(".page_3").stop().slideUp();

    })
    
});
