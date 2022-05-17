class employee {
    constructor(deskId) {
        this.name = getRandomName(nameArray);
        this.production = 1;
        this.salary = 100;
        this.happiness = Math.floor(Math.random() * (60 - 40) + 40);//Pourcentage de bonheur de base aléatoire entre 60 % et 40 %
        this.deskId = deskId
    }

    getProduction() {
        this.updateStats();
        return this.production + this.calculateBonusProduction();
    }

    getSalary() {
        return this.salary;
    }

    getHappiness() {
        return this.happiness;
    }

    getName(){
        return this.name;
    }

    getDesk(){
        return dataManager.getData().desk[this.deskId];
    }

    //Valeur arbitraire : 10% de bonheur de plus que 50% = 4% de prod en plus (et inversement)
    calculateBonusProduction() {
        if (this.happiness > 50) {
            let tmpProd = this.production;
            tmpProd = tmpProd * (this.happiness - 50) * 0.004;
            return tmpProd;
        }
        else {
            let tmpProd = this.production;
            tmpProd = tmpProd * (this.happiness - 50) * 0.004;
            return tmpProd;
        }


    }

    updateHappiness() {
        
        /*
        if(salleDeSport){

        }

        if(salleDeSieste){

        }*/

    }

    updateStats(){
        let data = dataManager.getData();
        switch (data.desk.level) {
            case 1:
                this.production = 1;
                break;

            case 2:
                this.production = 2;
                break;

            case 3:
                this.production = 3;
                break;
        }
    }

    
}

let nameStr = "Lucas Haboussi,Antoine Mignien,Aurélien Rogé,Guillaume Leroy,Théo Vangheluwe,James Rodriguez,Joseph Levine,Christopher Payne,Robert Camacho,Jose Payne,Matthew Torres,Ryan Ryan,Erik Bishop,Martin Larsson,Tyler Joseph,Josh Dun,Bryce Johnson,Zachary Nguyen,Greg Morris,Michael Eaton Jr.,Ethan Poole,Ryan Hill,Thomas Collins, "
let nameArray = nameStr.split(",");

function random(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomName(array){
  let randomValue = random(0, array.length);
  let result = array[randomValue];
  array.splice(randomValue, 1);
  return result
}