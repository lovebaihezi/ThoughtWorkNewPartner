window.onload = function(){
    var right = document.querySelector('.arrow_right');
    var left = document.querySelector('.arrow_left');
    var card_1 = document.querySelector('.card_1');
    var card_2 = document.querySelector('.card_2');
    right.addEventListener('click',function(){
        card_1.style.opacity = '0';
        card_2.style.opacity = '1';
    })
    left.addEventListener('click',function(){
        card_1.style.opacity = '1';
        card_2.style.opacity = '0';
    })
}
