module.exports = {
    "user": {
        "name": "guest",
        "money": 100,
    },

    "desk": [
        {
            "id": 0,
            "pos": [[4,11],[5,11],[6,11],[4,12],[5,12],[6,12],[4,13],[5,13],[6,13]],
            /// 1 = horizontal bas / 2 = horizontal haut / 3 = vertical gauche / 4 vertical droit
            "orientation": 1,
            "active": false,
            "level": 0,
            "employee": undefined
        },
        {
            "id": 1,
            "pos": [[24,15],[25,15],[26,15],[24,16],[25,16],[26,16],[24,17],[25,17],[26,17],[24,18],[25,18],[26,18]],
            "orientation": 4,
            "active": false,
            "level": 0,
            "employee": undefined
        }
    ],

    "system": {
        "currentTime": 1
    }
}