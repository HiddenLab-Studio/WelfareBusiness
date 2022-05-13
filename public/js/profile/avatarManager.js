let avatarManager = (function(){
    let invalidAvatarContainer = document.getElementById("invalidAvatarContainer")
    let changeAvatarBtn = document.getElementById("changeAvatarBtn");
    let currentAvatar = undefined;
    let previousTarget = undefined;
    let transition = false;

    changeAvatarBtn.addEventListener("click", () => {
        if(currentAvatar !== undefined && between(currentAvatar, 1, 4)){
            sendData(currentAvatar);
        } else {
            if(!transition){
                transition = true;
                $(invalidAvatarContainer).fadeIn(750);
                console.error("currentAvatar undefined or out of range!")
                setTimeout(function(){
                    $(invalidAvatarContainer).fadeOut(750);
                    transition = false;
                }, 2500)
            }
        }
    })

    function between(value, min, max){
        return value >= min && value <= max;
    }

    return {
        selectAvatar(event){
            let target = event.currentTarget;
            currentAvatar = parseInt(target.getAttribute("data"));
            if(previousTarget === undefined){
                target.classList.toggle("avatarSelected");
                previousTarget = target;
            } else {
                previousTarget.classList.toggle("avatarSelected");
                target.classList.toggle("avatarSelected");
                previousTarget = target;
            }
        }
    }
})();