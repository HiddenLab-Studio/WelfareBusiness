let accountModal = document.getElementById("accountModal");
let myAccountBtn = document.getElementById("myAccountBtn");
let insideAccountModal = false;
let transition = false;

// FadeIn and FadeOut in JQuery hover (accountBtn)
$(document).ready(function () {
    $(myAccountBtn).hover(function() {
        console.log("btn inside")
        if(!insideAccountModal && !transition){
            transition = true;
            $(accountModal).fadeIn(500);
            setTimeout(function(){
                transition = false;
            }, 500)
        }
    }, function(){
        setTimeout(function(){
            if(!insideAccountModal && !transition){
                transition = true;
                $(accountModal).fadeOut(500);
                setTimeout(function(){
                    transition = false;
                }, 500)
            }
        }, 1000)
        console.log("btn outside")
    })

    $(accountModal).hover(function() {
        insideAccountModal = true;
        console.log("inside account modal")
    }, function(){
        insideAccountModal = false;
        if(!transition){
            transition = true;
            $(accountModal).fadeOut(500);
            setTimeout(function(){
                transition = false;
            }, 500)
        }
        console.log("outside account modal")
    })

});