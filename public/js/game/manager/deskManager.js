let deskManager = (function () {
    // Variables ultra méga giga importantes
    let game = undefined;
    let config = undefined;
    let init = false;
    let token = "1";

    // Contient toutes les informations de notre joueur
    // Cette variable ne doit en aucun cas être accessible
    let data = undefined;

    // Contient pour chaque orientation une array qui contient la texture de base et ses améliorations successives
    let textureIndex = [
        {
            orientation: 1,
            index: [
                [1, 4],
                [2, 5],
                [3, 6],
                [29, 32],
                [30, 33],
                [31, 34]
            ]
        },
        {
            orientation: 2,
            index: [
                // A CHANGER
                [1, 4],
                [2, 5],
                [3, 6],
                [29, 32],
                [30, 33],
                [31, 34]
            ]
        },
        {
            orientation: 3,
            index: [
                // A CHANGER
                [57, 60],
                [58, 61],
                [85, 88],
                [86, 89],
                [113, 116],
                [114, 117],
                [141, 144],
                [142, 145]
            ]
        }
    ]

    // Variables utilitaires
    const maxDeskLevel = 2;
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

    // Setter private
    function upgradeDesk(layer, deskData) {
        // Conditions pour upgrade un bureau (< au lvl max / le bureau est actif (sécurité))
        if (deskData.level < maxDeskLevel && deskData.active) {
            // On récupère l'objet qui contient l'index de chaque texture avec la texture qui correspond à son amélioration
            let upgradeTextureArray = textureIndex.filter((element) => {
                if(deskData.orientation === element.orientation) return element;
            });

            for (const coordinate of deskData.pos) {
                let tileIndex = layer.getTileAt(coordinate[0], coordinate[1]).index;
                for (const array of upgradeTextureArray[0].index) {
                    if(array.includes(tileIndex)){
                        //console.log("(" + array + ") include " + tileIndex)
                        // On récupère l'index du chiffre puis le prochain index de la texture
                        let indexOfElement = array.indexOf(tileIndex);
                        //console.log("next texture index is: " + array[indexOfElement + 1]);
                        layer.getTileAt(coordinate[0], coordinate[1]).index = array[indexOfElement + 1];
                    }
                }
            }
            deskData.level += 1;
            dataManager.save(token, data);
        }
    }

    return {
        getCoordinate(layer){
            layer.forEachTile((tile) => {
                if(tile.index !== -1){
                    console.log(tile.x, tile.y)
                }
            })
        },

        // Initialisation des variables
        async init(cfg) {
            if(!init){
                init = true;
                config = cfg;
                await dataManager.load(token).then(r => data = r);
                //console.log(data)
            }
        },

        //Création des listeners des bureaux
        registerEvent(layer, instance) {
            // Listener quand on clique sur une case
            instance.input.on("pointerdown", (pos) => {
                // try catch car la target peut être null (NullPointerException)
                try {
                    let target = layer.getTileAtWorldXY(pos.x, pos.y);
                    // DEBUG
                    // console.log("Click detected position: x:" + target.x + " y:" + target.y);
                    // console.log("Index of the clicked case is " + target.index)

                    let result = undefined;
                    let id = undefined;
                    let level = undefined;
                    let active = undefined;
                    for (const element of data.desk) {
                        element.pos.forEach((coordinate) => {
                            if(coordinate[0] === target.x && coordinate[1] === target.y){
                                //console.log(coordinate[0] === target.x && coordinate[1] === target.y)
                                //console.log(element.id)
                                id = element.id;
                                level = element.level;
                                active = element.active;
                                result = true;
                            }
                        })
                    }
                    // Si la case cliqué correspond à un bureau on ouvre le popup du bureau!
                    if (result && !isDeskWindowOpened && active){
                        // Condition: aucune fenêtre actuellement ouverte et le bureau est actif
                        deskManager.openDesk(layer, id, instance);
                    }
                } catch (NullPointerException) {/*ignored*/}
            })
        },

        // SHOULD BE CLEANER
        // Affiche le menu du bureau sur lequel on a cliqué
        openDesk(layer, id, instance){
            // Boolean qui permet de savoir si une fenêtre est ouverte
            isDeskWindowOpened = true;
            let deskData = getDeskById(id)[0];

            // Ajout des éléments à notre fenêtre
            let deskGroup = instance.add.group();
            let deskWindow = instance.add.image(config.width * 0.5, 300, "windowBack").setScale(0.6, 0.8).setScrollFactor(0);
            let closeBtn = instance.add.image(0, 0, "closeWindowBtn").setScale(0.5).setScrollFactor(0);
            let textId = instance.add.text(0, 0, "Desk n°" + id + " (Lv. " + deskData.level + ")", {color: "black", fontFamily: "Minecraft"});
            let upgradeDeskBtn = instance.add.text(0, 0, "UPGRADE", {cursor: "pointer", color: "black", fontFamily: "Minecraft"});

            // Alignement des éléments
            Phaser.Display.Align.In.Center(deskWindow, instance.add.zone(500, 280, 1000, 563));
            Phaser.Display.Align.In.TopRight(closeBtn, deskWindow);
            Phaser.Display.Align.In.TopCenter(textId, deskWindow);
            Phaser.Display.Align.In.Center(upgradeDeskBtn, deskWindow);
            closeBtn.setPosition(closeBtn.x - 100, closeBtn.y + 40);
            textId.setPosition(textId.x, textId.y + 95);

            deskGroup.add(deskWindow).add(closeBtn).add(textId).add(upgradeDeskBtn);

            // Listener pour le close btn et l'upgrade btn
            closeBtn.setInteractive({cursor: "pointer"}).on("pointerdown", () => {
                deskGroup.clear(true);
                isDeskWindowOpened = false;
            })

            upgradeDeskBtn.setInteractive({cursor: "pointer"}).on("pointerdown", () => {
                upgradeDesk(layer, deskData);
                deskGroup.clear(true);
                isDeskWindowOpened = false;
            })
        }
    }
})();