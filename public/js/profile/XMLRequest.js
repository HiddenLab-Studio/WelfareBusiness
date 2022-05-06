/**
 * Transmet l'index de l'avatar sélectionné par l'utilisateur
 * @param data
 */
function sendData(data) {
    let XHR = new window.XMLHttpRequest();
    XHR.addEventListener("error", XHRRequestFailed, false);
    XHR.addEventListener("load", XHRRequestComplete, false);
    let avatarIndex = {value: data.toString()};
    XHR.open("POST", "/api/changeavatar", true)
    XHR.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    // On envoie les données au serveur celui va les traiter
    // Une fois que nos données ont été traitées le listener "load" va exécuter la fonction XHRRequestComplete()
    XHR.send(JSON.stringify(avatarIndex))
}

function XHRRequestComplete(){
    console.info("XHR request complete!")
    //window.location.href = "/profile";
}

function XHRRequestFailed(){
    console.error("XHR request error!")
    //window.location.href = "/profile";
}