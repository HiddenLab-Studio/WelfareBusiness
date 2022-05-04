let registerTextSpan = document.getElementById("registerSpan");
let connectionTextSpan = document.getElementById("connectSpan");
let connectionContainer = document.getElementById("connectContainer");
let registerContainer = document.getElementById("registerContainer");

// FadeIn and FadeOut in JQuery (connectBtn)
$(document).ready(function () {
    $("#connect").click(function () {
        $("#accountModal").fadeIn(500);
    });
    $("#close").click(function () {
        $("#accountModal").fadeOut(500);
    });
});

let transition = false;
registerTextSpan.addEventListener("click", () => {
    if (transition) return;
    transition = true;
    $(connectionContainer).fadeOut(525);
    setTimeout(function () {
        $(registerContainer).fadeIn(500)
        transition = false;
    }, 500)
})

connectionTextSpan.addEventListener("click", () => {
    if (transition) return;
    transition = true;
    $(registerContainer).fadeOut(525);
    setTimeout(function () {
        $(connectionContainer).fadeIn(500)
        transition = false;
    }, 500)
})
