let deskManager = (function() {

    let game = undefined;
    let config = undefined;

    // tableau d'objets qui contient toutes les informations concernant nos bureaux
    // Cette variable ne doit en aucun cas être accessible
    let savedDesk = [];
    // Id des textures A CHANGER LORSQUE LA MAP EST UPDATE
    let allowedIndex = [1, 2, 3, 29, 30, 31];

    let deskWindow = undefined;
    let isDeskWindowOpened = undefined;

    // Getters private function
    function getSavedDesk(){
        return savedDesk;
    }

    function getDesk(id){
        if(id >= 0 && id <= (savedDesk.length - 1)){
            return savedDesk.filter((element) => {
                if(element.id === id){ return element }
            })
        } else {
            console.error("IndexOutOfBoundException:19")
            return null;
        }
    }

    return {

        /**
         * Concatène chaque case (texture) afin de ne former qu'un seul bloc i.e. un bureau
         */
        init(layer, phaser, cfg){
            game = phaser;
            config = cfg;
            let posConcat = [];
            let frameArray = [];
            let id = 0;
            layer.forEachTile((element) => {
                let elementIndex = element.index;
                if (elementIndex !== -1 && allowedIndex.includes(elementIndex)) {
                    // On ajoute chaque obj bureau à un tableau qui contient chaque frame/fragment du bureau
                    frameArray.push({
                        materialId: elementIndex,
                        pos: [element.x, element.y]
                    });

                    // Initialement les bureaux sont de longueurs 6
                    // On vient ici recoller toutes les frames du bureau pour former un bloc
                    if (frameArray.length === 6) {
                        for (let i = 0; i < 6; i++) { posConcat[i] = frameArray[i].pos; }
                        let obj = {
                            id: id,
                            pos: posConcat,
                            level: 1
                        }
                        id++;
                        frameArray = [];
                        posConcat = [];
                        savedDesk.push(obj);
                    }
                }
            })
            console.log(savedDesk)
        },

        registerEvent(layer, instance){
            // Listener quand on clique sur une case
            instance.input.on("pointerdown", (pos) => {
                // try catch car la target peut être null (NullPointerException)
                try {
                    let target = layer.getTileAtWorldXY(pos.x, pos.y);
                    // DEBUG
                    console.log("Click detected position: x:" + target.x + " y:" + target.y);
                    console.log("Index of the clicked case is " + target.index)

                    // On vient check si l'endroit où on a cliqué correspond à un bureau
                    let id = undefined;
                    let result = savedDesk.filter((element) => {
                        element.pos.forEach((pos) => {
                            if(pos.includes(target.x) && pos.includes(target.y)){
                                id = element.id;
                                return true;
                            }
                        });
                    })

                    // Si la case cliqué correspond à un bureau on ouvre le popup du bureau!
                    if(result){
                        console.log("Clique détecté sur le bureau n°" + id)
                        deskManager.openDesk(id, instance);
                    }
                } catch (NullPointerException) {}
            })
        },

        // SHOULD TO BE CLEANER
        openDesk(id, instance){
            let deskData = getDesk(id);
            isDeskWindowOpened = true;
            deskWindow = instance.add.image(0, 0, "background").setScale(0.6, 0.8).setScrollFactor(0);
            let closeBtn = instance.add.image(0, 0, "closeBtn").setScale(0.6, 0.8).setScrollFactor(0);
            let textId = instance.add.text(0, 0, "Bureau n°" + id, { fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif' });
            Phaser.Display.Align.In.Center(deskWindow, instance.add.zone(400, 300, 800, 600));
            Phaser.Display.Align.In.TopRight(closeBtn, deskWindow);
            Phaser.Display.Align.In.TopCenter(textId, deskWindow);
            closeBtn.setPosition(closeBtn.x - 165, closeBtn.y + 95)
            textId.setPosition(textId.x, textId.y + 95)
            closeBtn.setInteractive().on("pointerdown", () => {
                deskWindow.destroy();
                closeBtn.destroy();
                textId.destroy();
                deskWindow = undefined;
            })
        }
    }

})();