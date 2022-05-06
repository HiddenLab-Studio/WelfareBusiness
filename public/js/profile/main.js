window.onload = function(){
    let allEditableSection = document.getElementsByClassName("profile__editor");

    let editModal = document.getElementById("editModal");
    let changeUsernameContainer = document.getElementById("changeUsernameContainer");
    let changePasswordContainer = document.getElementById("changePasswordContainer");
    let changeAvatarContainer = document.getElementById("changeAvatarContainer");
    let closeEditModalBtn = document.getElementById("closeEditModal");

    let avatarSelectionContainer = document.getElementById("avatarSelectionContainer");
    avatarSelectionContainer.querySelectorAll("img").forEach(element => {
        element.addEventListener("click", avatarManager.selectAvatar)
    })

    for (const allEditableSectionElement of allEditableSection) {
        let i = allEditableSectionElement.children[1];
        i.addEventListener("click", () => {
            $(editModal).fadeIn(750);
            let id = i.getAttribute("id");
            switch (id){
                case "changeUsernameBtn":
                    $(changeUsernameContainer).fadeIn(750);
                    break;
                case "changePasswordBtn":
                    $(changePasswordContainer).fadeIn(750);
                    break;
                case "changeAvatarBtn":
                    $(changeAvatarContainer).fadeIn(750);
                    break;
                default:
                    break;
            }
        })
    }

    closeEditModalBtn.addEventListener("click", () => {
        $(editModal).fadeOut(750);
        $(changeUsernameContainer).fadeOut(750);
        $(changeAvatarContainer).fadeOut(750);
        $(changePasswordContainer).fadeOut(750);
    })
}