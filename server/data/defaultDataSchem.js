module.exports = {
    "user": {
        "money": 100,
    },

    "desk": [
        {
            "id": 0,
            "pos": [[7,5],[8,5],[9,5],[7,6],[8,6],[9,6]],
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
            "pos": [[14,5],[15,5],[16,5],[14,6],[15,6],[16,6]],
            "orientation": 1,
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