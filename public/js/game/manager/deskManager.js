let deskManager = (function() {
    // Variables ultra méga giga importantes
    let game = undefined;
    let config = undefined;

    // Contient toutes les informations de notre joueur
    // Cette variable ne doit en aucun cas être accessible
    let data = undefined;

    // Variables utilitaires
    let deskWindow = undefined;
    let isDeskWindowOpened = undefined;

    // Getter private
    function getDeskById(id) {
        if (id >= 0 && id <= (data.desk.length - 1)) {
            return data.desk.filter((element) => {
                if (element.id === id) {
                    return element
                }
            })
        } else {
            console.error("IndexOutOfBoundException:19")
            return -1;
        }
    }

    /**
     * Permet de load avec une méthode fetch les données de l'utilisateur si celui-ci est connecté pour pouvoir rétablir ça partie
     */
    function loadData() {
        fetch("/api/userdata", {
            method: "get",
            mode: "cors",
            headers: new Headers({"Content-Type": "application/json"})
        })
            .then(response => response.json())
            .then((json) => {
                console.info("Fetch userdata completed!");
                console.log(json);
                data = json;
            })
    }

    return {
        // Initialisation des variables
        init(layer, phaser, cfg){
            game = phaser;
            config = cfg;
            loadData();
        },

        //Création des listeners des bureaux
        registerEvent(layer, instance){
            // Listener quand on clique sur une case
            instance.input.on("pointerdown", (pos) => {
                // try catch car la target peut être null (NullPointerException)
                try {
                    let target = layer.getTileAtWorldXY(pos.x, pos.y);
                    // DEBUG
                    //console.log("Click detected position: x:" + target.x + " y:" + target.y);
                    //console.log("Index of the clicked case is " + target.index)

                   let id = undefined;
                   let level = undefined;
                   let result = data.desk.filter((element) => {
                        element.pos.forEach((pos) => {
                            if(pos.includes(target.x) && pos.includes(target.y)){
                                // DEBUG
                                //console.log(target.x, target.y, element.id);
                                id = element.id;
                                level = element.level;
                                return true;
                            }
                        });
                    })
                    // Si la case cliqué correspond à un bureau on ouvre le popup du bureau!
                    if(result){
                        if(!isDeskWindowOpened){
                            // DEBUG
                            //console.log("Clique détecté sur le bureau n°" + id)
                            deskManager.openDesk(id, instance);
                        }
                    }
                } catch (NullPointerException) {/*ignored*/}
            })
        },

        // SHOULD BE CLEANER
        // Affiche le menu du bureau sur lequel on a cliqué
        openDesk(id, instance){
            let deskData = getDeskById(id)[0];
            console.log(deskData)
            isDeskWindowOpened = true;
            deskWindow = instance.add.image(0, 0, "background").setScale(0.6, 0.8).setScrollFactor(0);
            let closeBtn = instance.add.image(0, 0, "closeBtn").setScale(0.6, 0.8).setScrollFactor(0);
            let textId = instance.add.text(0, 0, "Bureau n°" + id + " (Lv. " + deskData.level + ")", {color: "white", fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
            Phaser.Display.Align.In.Center(deskWindow, instance.add.zone(400, 300, 800, 600));
            Phaser.Display.Align.In.TopRight(closeBtn, deskWindow);
            Phaser.Display.Align.In.TopCenter(textId, deskWindow);
            closeBtn.setPosition(closeBtn.x - 165, closeBtn.y + 95)
            textId.setPosition(textId.x, textId.y + 95)

            closeBtn.setInteractive({ cursor: 'pointer' }).on("pointerdown", () => {
                deskWindow.destroy();
                closeBtn.destroy();
                textId.destroy();
                deskWindow = undefined;
                isDeskWindowOpened = false;
            })
        }
    }

})();