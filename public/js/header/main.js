window.onload = function(){
    AOS.init()
    let showPasswordBtn = document.getElementsByClassName("show__password");
    for (const showPasswordBtnElement of showPasswordBtn) {
        showPasswordBtnElement.addEventListener("click", () => {
            let input = showPasswordBtnElement.parentElement.children[0];
            if(input.getAttribute("type") === "password"){
                input.setAttribute("type", "text");
            } else {
                input.setAttribute("type", "password");
            }
        })
    }
}
