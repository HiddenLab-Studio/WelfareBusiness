let dataManager = (function() {

    let init = false;
    let token = "1";
    let map = undefined;
    let data = undefined;
    let username = undefined;

    let config = {
        autoSave: true,
        pause: false,
        interval: 30000,
    }

    function autoSaveData(){
        if(config.autoSave){
            setInterval(function(){
                //console.info("Auto save enabled!")
                if(!config.pause) saveData(token, data);
            }, config.interval)
        }
    }

    async function loadData(access){
        if(access === token){
            await fetch("/api/userdata", {
                method: "get",
                mode: "cors",
                headers: new Headers({"Content-Type": "application/json"})
            })
                .then(response => response.json())
                .then((json) => {
                    console.info("Fetch userdata completed!");
                    //console.log(json);
                    data = json;
                    username = data.user.name;
                })
            console.log(data)
            return data;
        }
    }

    function saveData(access, data){
        if(access === token){
            fetch("/api/savedata", {
                method: "POST",
                headers: new Headers({"Content-Type": "application/json"}),
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then((obj) => {
                    console.info(obj.text);
                })
        }
    }

    function resetData(access){
        if(token === access){
            fetch("/api/resetdata", {
                method: "POST",
                headers: new Headers({"Content-Type": "application/json"}),
                body: undefined
            })
                .then(response => response.json())
                .then((obj) => {
                    console.info(obj.text);
                })
        }
    }

    return {
        init(tileMap){
            if(!init){
                map = tileMap;
                if(config.autoSave) console.info("Auto save enabled!");
                autoSaveData(false);
            }
        },

        // Getters
        getUsername: () => username,
        getData: () => data,

        // Setters
        autoSavePause: () => config.pause = true,
        reset: (access) => resetData(access),
        save: (access, data) => saveData(access, data),
        async load(access) {
            let result;
            await loadData(access).then(response => {
                result = response;
            })
            return result;
        },

        // Methods
        autoSave: () => autoSaveData(),
        showMap: () => console.log(map),
    }
})();