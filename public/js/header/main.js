window.onload = function(){
    let registerTextSpan = document.getElementById("registerSpan");
    let connectionTextSpan = document.getElementById("connectSpan");
    let connectionContainer = document.getElementById("connectContainer");
    let registerContainer = document.getElementById("registerContainer");

    // FadeIn and FadeOut in JQuery (connectBtn)
    $(document).ready(function(){
        $("#connect").click(function(){
            $("#accountModal").fadeIn(750);
        });
        $("#close").click(function(){
            $("#accountModal").fadeOut(750);
        });
    });

    let transition = false;
    registerTextSpan.addEventListener("click", () => {
        if(transition) return;
        transition = true;
        $(connectionContainer).fadeOut(200);
        setTimeout(function(){
            $(registerContainer).fadeIn(200)
            transition = false;
        }, 200)
    })
    connectionTextSpan.addEventListener("click", () => {
        if(transition) return;
        transition = true;
        $(registerContainer).fadeOut(200);
        setTimeout(function(){
            $(connectionContainer).fadeIn(200)
            transition = false;
        }, 200)
    })

}
