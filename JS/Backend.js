$(function () {
    $(".page_2").slideUp();
    $(".page_3").slideUp();
    $(".page_4").slideUp();
    $(".page_5").slideUp();
    $(".page_6").slideUp();
    
    $(".theme_1").on('click', function(){
      // $(".page_1").css({
      //   "height" : 0 ,
      //   "padding" : 0
      // })
      $(".page_1").stop().slideToggle();
      $(".page_2").stop().slideUp();
      $(".page_3").stop().slideUp();
      $(".page_4").stop().slideUp();
      $(".page_5").stop().slideUp();
      $(".page_6").stop().slideUp();

    });
    $(".theme_2").on('click', function(){
      // $(".page_1").css({
      //   "height" : 0 ,
      //   "padding" : 0
      // })
      
      $(".page_2").stop().slideToggle();
      $(".page_1").stop().slideUp();
      $(".page_3").stop().slideUp();
      $(".page_4").stop().slideUp();
      $(".page_5").stop().slideUp();
      $(".page_6").stop().slideUp();

    });
    $(".theme_3").on('click', function(){
      // $(".page_1").css({
      //   "height" : 0 ,
      //   "padding" : 0
      // })
      $(".page_3").stop().slideToggle();
      $(".page_2").stop().slideUp();
      $(".page_1").stop().slideUp();
      $(".page_4").stop().slideUp();
      $(".page_5").stop().slideUp();
      $(".page_6").stop().slideUp();
    });
    $(".theme_4").on('click', function(){
        // $(".page_1").css({
        //   "height" : 0 ,
        //   "padding" : 0
        // })
        $(".page_4").stop().slideToggle();
        $(".page_2").stop().slideUp();
        $(".page_1").stop().slideUp();
        $(".page_3").stop().slideUp();
        $(".page_5").stop().slideUp();
        $(".page_6").stop().slideUp();
      });
      $(".theme_5").on('click', function(){
        // $(".page_1").css({
        //   "height" : 0 ,
        //   "padding" : 0
        // })
        $(".page_5").stop().slideToggle();
        $(".page_2").stop().slideUp();
        $(".page_1").stop().slideUp();
        $(".page_4").stop().slideUp();
        $(".page_3").stop().slideUp();
        $(".page_6").stop().slideUp();
      });
      $(".theme_6").on('click', function(){
        // $(".page_1").css({
        //   "height" : 0 ,
        //   "padding" : 0
        // })
        $(".page_6").stop().slideToggle();
        $(".page_2").stop().slideUp();
        $(".page_1").stop().slideUp();
        $(".page_4").stop().slideUp();
        $(".page_5").stop().slideUp();
        $(".page_3").stop().slideUp();
      });
    
});
