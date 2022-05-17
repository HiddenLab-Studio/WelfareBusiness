module.exports = {
    "user": {
        "name": "guest",
        "money": 100,
    },

    "desk": [
        {
            "id": 0,
            "pos": [[4,11],[5,11],[6,11],[4,12],[5,12],[6,12],[4,13],[5,13],[6,13]],
            /// 1 = horizontal bas / 2 = horizontal haut / 3 = vertical gauche / 4 vertical droite
            "orientation": 1,
            "active": false,
            "level": 0,
            "employee": undefined
        },
        {
            "id": 1,
            "pos": [],
            "orientation": 3,
            "active": false,
            "level": 0,
            "employee": undefined
        }
    ],

    "system": {
        "currentTime": 1
    }
}