module.exports = {
    "user": {
        "money": 100,
    },

    "desk": [
        {
            "id": 0,
            "pos": [[5,4],[6,4],[7,4],[5,5],[6,5],[7,5]],
            /// 1 = horizontal bas / 2 = horizontal haut / 3 = vertical gauche / 4 vertical droite
            "orientation": 1,
            "active": true,
            "level": 1,
            "employee": {
                "name": "Aurélien Rogé",
                "happiness": 100,
                "wage": 1000
            }
        },
        {
            "id": 1,
            "pos": [[3,6],[4,6],[3,7],[4,7],[3,8],[4,8],[3,9],[4,9]],
            "orientation": 3,
            "active": true,
            "level": 1,
            "employee": {
                "name": "Guillaume Leroy",
                "happiness": 1,
                "wage": 1
            }
        }
    ],

    "system": {
        "currentTime": 1
    }
}