let dataManager = (function() {

    let init = false;
    let token = "1";
    let map = undefined;
    let data = undefined;

    let config = {
        autoSave: false,
        interval: 600000,
    }

    function autoSaveData(){
        if(config.autoSave){
            setInterval(function(){
                console.info("Auto save enabled!")
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
                })
            return data;
        }
    }

    function saveData(access){
        if(access === token){
            console.info("Data successfully saved!")
        }
    }

    return {
        init(tileMap){
            if(!init){
                map = tileMap;
                autoSaveData();
            }
        },

        async load(access) {
            let result;
            await loadData(access).then(response => {
                result = response;
            })
            return result;
        },

        save: () => saveData(),
        autoSave: () => autoSaveData(),
        showMap: () => console.log(map),
    }
})();