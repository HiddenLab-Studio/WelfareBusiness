module.exports = {
    "user": {
        "name": "guest",
        "money": 100,
    },

    "shop": {
        "plant": {
            "level": 0,
            "pos": [[[3,10],[3,11], 0], [[7,10],[7,11], 0], [[4,19],[4,20], 1], [[11,19],[11,20], 1], [[4,26],[4,27], 2], [[11,26],[11,27], 2], [[14,13],[14,14], 3], [[14,8],[14,9], 3], [[26,13],[26,14], 4], [[26,8],[26,9], 4] ,[[17,4],[17,5], 5], [[23,4],[23,5], 5]]
        }
    },

    "desk": [
        //Bureau du boss
        {
            "id": 0,
            "pos": [[4,11],[5,11],[6,11],[4,12],[5,12],[6,12],[4,13],[5,13],[6,13]],
            /// 1 = horizontal bas / 2 = horizontal haut / 3 = vertical gauche / 4 vertical droit
            "orientation": 1,
            "active": false,
            "level": 0,
            "employee": undefined,
            "pnj": {
                "pos": [[176,376]],
            }
        },

        //Bureau vertical droite 
        {
            "id": 1,
            "pos": [[24,15],[25,15],[26,15],[24,16],[25,16],[26,16],[24,17],[25,17],[26,17],[24,18],[25,18],[26,18]],
            "orientation": 4,
            "active": false,
            "level": 0,
            "employee": undefined,
            "pnj": {
                "pos": [[826,521]],
            }
        },
        {
            "id": 2,
            "pos": [[24,10],[25,10],[26,10],[24,11],[25,11],[26,11],[24,12],[25,12],[26,12],[24,13],[25,13],[26,13]],
            "orientation": 4,
            "active": false,
            "level": 0,
            "employee": undefined,
            "pnj": {
                "pos": [[826,361]],
            }
        },
        {
            "id": 3,
            "pos": [[24,5],[25,5],[26,5],[24,6],[25,6],[26,6],[24,7],[25,7],[26,7],[24,8],[25,8],[26,8]],
            "orientation": 4,
            "active": false,
            "level": 0,
            "employee": undefined,
            "pnj": {
                "pos": [[826,201]],
            }
        },

        //Bureau vertical gauche
        {
            "id": 4,
            "pos": [[14,15],[15,15],[16,15],[14,16],[15,16],[16,16],[14,17],[15,17],[16,17],[14,18],[15,18],[16,18]],
            "orientation": 3,
            "active": false,
            "level": 0,
            "employee": undefined,
            "pnj": {
                "pos": [[487,521]],
            }
        },
        {
            "id": 5,
            "pos": [[14,10],[15,10],[16,10],[14,11],[15,11],[16,11],[14,12],[15,12],[16,12],[14,13],[15,13],[16,13]],
            "orientation": 3,
            "active": false,
            "level": 0,
            "employee": undefined,
            "pnj": {
                "pos": [[487,361]],
            }
        },
        {
            "id": 6,
            "pos": [[14,5],[15,5],[16,5],[14,6],[15,6],[16,6],[14,7],[15,7],[16,7],[14,8],[15,8],[16,8]],
            "orientation": 3,
            "active": false,
            "level": 0,
            "employee": undefined,
            "pnj": {
                "pos": [[487,201]],
            }
        },

        //Bureau top grande salle
        {
            "id": 7,
            "pos": [[19,5],[20,5],[21,5],[19,6],[20,6],[21,6],[19,7],[20,7],[21,7]],
            "orientation": 1,
            "active": false,
            "level": 0,
            "employee": undefined,
            "pnj": {
                "pos": [[656,185]],
            }
        },

        //Bureau top petite salle
        {
            "id": 8,
            "pos": [[1,20],[2,20],[3,20],[1,21],[2,21],[3,21],[1,22],[2,22],[3,22]],
            "orientation": 1,
            "active": false,
            "level": 0,
            "employee": undefined,
            "pnj": {
                "pos": [[80,664]],
            }
        },
        {
            "id": 9,
            "pos": [[8,20],[9,20],[10,20],[8,21],[9,21],[10,21],[8,22],[9,22],[10,22]],
            "orientation": 1,
            "active": false,
            "level": 0,
            "employee": undefined,
            "pnj": {
                "pos": [[305,664]],
            }
        },

        //Bureau bot petite salle
        {
            "id": 10,
            "pos": [[1,25],[2,25],[3,25],[1,26],[2,26],[3,26],[1,27],[2,27],[3,27]],
            "orientation": 2,
            "active": false,
            "level": 0,
            "employee": undefined,
            "pnj": {
                "pos": [[85,810]],
            }
        },
        {
            "id": 11,
            "pos": [[8,25],[9,25],[10,25],[8,26],[9,26],[10,26],[8,27],[9,27],[10,27]],
            "orientation": 2,
            "active": false,
            "level": 0,
            "employee": undefined,
            "pnj": {
                "pos": [[309,810]],
            }
        },
    ],

    "system": {
        "currentTime": 1
    }
}