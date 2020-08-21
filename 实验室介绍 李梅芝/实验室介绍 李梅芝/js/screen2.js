// window.onload = function(){
//     var right = document.querySelector('.arrow_right');
//     var left = document.querySelector('.arrow_left');
//     var card_1 = document.querySelector('.card_1');
//     var card_2 = document.querySelector('.card_2');
//     right.addEventListener('click',function(){
//         card_1.style.opacity = '0';
//         card_2.style.opacity = '1';
//     })
//     left.addEventListener('click',function(){
//         card_1.style.opacity = '1';
//         card_2.style.opacity = '0';
//     })
// }
// function animateFade(obj, target, callback){
//     clearInterval(obj.timer);
//     obj.timer = setInterval(function(){
//         // var step = (target - obj.offsetLeft)/10;
//         // if(step > 0){
//         //     step = Math.ceil(step);
//         // }
//         // else{
//         //     step = Math.floor(step);
//         // }
//         if(target == 0){
//             obj.style.opacity = obj.style.opacity - 0.1;
//         }
//         if(target == 1){
//             obj.style.opacity = obj.style.opacity + 0.1;
//         }
//         if(obj.style.opacity == target){
//             clearInterval(obj.timer);
//             if(callback){
//                 callback(obj);
//             }
//         }
//     },15)
    
// }
// window.onload = function(){
//     var right = document.querySelector('.arrow_right');
//     var left = document.querySelector('.arrow_left');
//     var card_1 = document.querySelector('.card_1');
//     var card_2 = document.querySelector('.card_2');
//     right.addEventListener('click',function(){
//         animateFade(card_2, 1 , function(obj){
//             obj.style.display = 'block';
//         })
//         animateFade(card_1, 0 , function(obj){
//             obj.style.display = 'none';
//         })
        
//         // card_2.style.opacity = '1';
//         // card_2.style.display = 'block';
//     })
//     left.addEventListener('click',function(){
//         animateFade(card_2, 0 , function(obj){
//             obj.style.display = 'none';
//         })
//         animateFade(card_1, 1 , function(obj){
//             obj.style.display = 'block';
//         })
//         // card_1.style.opacity = '1';
//         // card_1.style.display = 'block';
//     })
// }
// $(function(){
//     var $right = $('.arrow_right');
//     var $left = $('.arrow_left');
//     var $card_1 = $('.card_1');
//     var $card_2 = $('.card_2');
//     $right.addEventListener('click',function(){
//         card_1.style.opacity = '0';
//         card_2.style.opacity = '1';
//     })
//     $left.addEventListener('click',function(){
//         card_1.style.opacity = '1';
//         card_2.style.opacity = '0';
//     })
// })
$(function(){
    $('.arrow_right').click(function(){
        $('.card_1').stop().fadeOut(800);
        $('.card_2').stop().fadeIn(800);
    })
    $('.arrow_left').click(function(){
        $('.card_2').stop().fadeOut(800);
        $('.card_1').stop().fadeIn(800);
    })
})