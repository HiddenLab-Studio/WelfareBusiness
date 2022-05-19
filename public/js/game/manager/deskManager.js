let deskManager = (function () {
    // Variables ultra méga giga importantes
    let instance = undefined;
    let config = undefined;
    let init = false;
    let token = "1";

    // Contient toutes les informations de notre joueur
    // Cette variable ne doit en aucun cas être accessible
    let data = undefined;

    // Contient pour chaque orientation une array qui contient la texture de base et ses améliorations successives
    // Layer qui contient tous nos bureaux
    let deskLayer = undefined;
    const maxDeskLevel = 5;
    let textureIndex = [
        {
            orientation: 1,
            index: [
                [4, 13, 7, 16, 10],
                [5, 14, 8, 17, 11],
                [6, 15, 9, 18, 12],
                [32, 41, 35, 44, 38],
                [33, 42, 36, 45, 39],
                [34, 43, 37, 46, 40],
                [63, 72, 66],
                [64, 73, 67],
                [65, 74, 68]
            ]
        },
        {
            orientation: 2,
            index: [
                [284, 293, 203, 212, 206],
                [285, 294, 204, 213, 207],
                [286, 295, 205, 214, 208],
                [312, 321, 231, 240, 234],
                [313, 322, 232, 241, 235],
                [314, 323, 233, 242, 236],
                [340, 349, 259, 268, 262],
                [341, 350, 260, 269, 263],
                [342, 351, 261, 270, 264],



            ]
        },
        {
            orientation: 3,
            index: [
                [60, 69, 91, 100, 94],
                [61, 70, 92, 101, 95],
                [93, 102, 96],
                [88, 97, 119, 128, 122],
                [89, 98, 120, 129, 123],
                [121, 130, 124],
                [116, 125, 147, 156, 150],
                [117, 126, 148, 157, 151],
                [149, 158, 152],
                [144, 153, 175, 184, 178],
                [145, 154, 176, 185, 179],
                [177, 186, 180]



            ]
        },
        {
            orientation: 4,
            index: [
                [287, 296, 290],
                [172, 181, 288, 297, 291],
                [173, 182, 289, 298, 292],
                [315, 324, 318],
                [200, 209, 316, 325, 319],
                [201, 210, 317, 326, 320],
                [343, 352, 346],
                [228, 237, 344, 353, 347],
                [229, 238, 345, 354, 348],
                [371, 380, 374],
                [256, 265, 372, 381, 375],
                [257, 266, 373, 382, 376]
            ]
        }
    ]

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
     * Lorsque les données du joueurs sont chargées on vient update la tileMap (chaque texture) en fonction de sa sauvegarde
     */
    function loadDeskTexture() {
        data.desk.forEach((element) => {
            let c = undefined;
            let count = 0;
            if (element.level !== 1) {
                console.log(element.level)
                let upgradeArray = textureIndex.filter((array) => {
                    if (array.orientation === element.orientation) {
                        switch (array.orientation) {
                            case 1:
                                c = [6, 7, 8];
                                break;
                            case 3:
                                c = [2, 5, 8, 11];
                                break;
                            case 4:
                                c = [0, 3, 6, 9];
                                break;
                            default:
                                break;
                        }
                        return element;
                    }
                });

                for (let i = 1; i < element.level; i++) {
                    for (const coordinate of element.pos) {
                        try {
                            let tileIndex = deskLayer.getTileAt(coordinate[0], coordinate[1]).index;
                            for (const array of upgradeArray[0].index) {
                                if (array.includes(tileIndex)) {
                                    let indexOfElement = array.indexOf(tileIndex);
                                    deskLayer.getTileAt(coordinate[0], coordinate[1]).index = array[indexOfElement + 1];
                                }
                            }
                        } catch (NullPointerException) {
                            if (i === 2) {
                                //console.log(deskLayer.hasTileAt(coordinate[0],coordinate[1]));*/
                                deskLayer.putTileAt(upgradeArray[0].index[c[count]][0], coordinate[0], coordinate[1]);
                                count += 1;
                            }
                        }
                    }
                }
            }
        })
    }
    function loadEmployee() {
        for (const element of data.desk) {
            if (element.employee !== undefined) {
                mapManager.getWelfareBusinessGame().addEmployee(element);
            }
        }
    }


    return {
        //getter public (code pas propre)
        getDeskById(id) {
            return getDeskById(id);
        },
        buyDesk(desk) {
            if (desk.level === 0) {
                desk.level += 1
                desk.active = true;
            }
        },
        upgradeDesk(deskData) {
            // Conditions pour upgrade un bureau (< au lvl max / le bureau est actif (sécurité))
            if (deskData.level < maxDeskLevel && deskData.active) {
                // On récupère l'objet qui contient l'index de chaque texture avec la texture qui correspond à son amélioration
                let c = undefined;
                let i = 0;
                let upgradeTextureArray = textureIndex.filter((element) => {
                    if (deskData.orientation === element.orientation) {
                        switch (deskData.orientation) {
                            case 1:
                                c = [6, 7, 8];
                                break;
                            case 3:
                                c = [2, 5, 8, 11];
                                break;
                            case 4:
                                c = [0, 3, 6, 9];
                                break;
                            default:
                                break;
                        }
                        return element;
                    }
                });

                //console.log("value of c is ", c)
                //console.log(upgradeTextureArray)
                for (const coordinate of deskData.pos) {
                    try {
                        let tileIndex = deskLayer.getTileAt(coordinate[0], coordinate[1]).index;
                        for (const array of upgradeTextureArray[0].index) {
                            if (array.includes(tileIndex)) {
                                // On récupère l'index du chiffre puis le prochain index de la texture
                                let indexOfElement = array.indexOf(tileIndex);
                                deskLayer.getTileAt(coordinate[0], coordinate[1]).index = array[indexOfElement + 1];
                            }
                        }
                    } catch (NullPointerException) {
                        if (deskData.level >= 2) {
                            //console.log(deskLayer.hasTileAt(coordinate[0],coordinate[1]));
                            deskLayer.putTileAt(upgradeTextureArray[0].index[c[i]][0], coordinate[0], coordinate[1]);
                            i += 1;
                        }
                    }
                }
                deskData.level += 1;
                dataManager.save(token, data);
            }
        },

        getCoordinate() {
            deskLayer.forEachTile((tile) => {
                if (tile.index !== -1) {
                    console.log(tile.x, tile.y)
                }
            })
        },

        // Initialisation des variables
        init(layer, phaser, cfg) {
            if (!init) {
                init = true;
                instance = phaser;
                deskLayer = layer;
                config = cfg;

                data = dataManager.getData();
                //await dataManager.load(token).then((response) => data = response);
                loadDeskTexture(layer, instance);
                loadEmployee();
                deskManager.registerEvent()
            }
        },

        //Création des listeners des bureaux
        registerEvent() {
            // Listener quand on clique sur une case
            instance.input.on("pointerdown", (pos) => {
                // try catch car la target peut être null (NullPointerException)
                try {
                    let target = deskLayer.getTileAtWorldXY(pos.worldX, pos.worldY);
                    // DEBUG
                    console.log(target.x, target.y);
                    // console.log("Index of the clicked case is " + target.index)

                    let result = undefined;
                    let id = undefined;
                    let level = undefined;
                    let active = undefined;
                    for (const element of data.desk) {
                        element.pos.forEach((coordinate) => {
                            if (coordinate[0] === target.x && coordinate[1] === target.y) {
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
                    if (result && (!mapManager.getHud().getWindow().isOpened() && !mapManager.getHud().getWindow().isShopOpened())) {
                        // Condition: aucune fenêtre actuellement ouverte et le bureau est actif
                        deskManager.openDesk(id);
                    }
                } catch (NullPointerException) {}
            })
        },

        // Affiche le menu du bureau sur lequel on a cliqué
        openDesk(id) {
            // Boolean qui permet de savoir si une fenêtre est ouverte
            let deskData = getDeskById(id)[0];
            console.log(deskData.orientation)
            mapManager.getHud().getWindow().createBackWindow();
            mapManager.getHud().getWindow().beEmployeeWindow(mapManager.getWelfareBusinessGame().getEmployeeById(id), getDeskById(id)[0]);
            //Si le bureau n'est pas encore acheté (pas d'employé)
            if (!deskData.active) {
                console.log(mapManager.getHud.getWindow())
                mapManager.getHud.getWindow().beEmployeeWindow(undefined, getDeskById(id)[0])
            }
        }
    }
})();