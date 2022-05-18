class employee {
    constructor(deskId) {
        this.name = getRandomName(nameArray);
        this.production = 1;
        this.salary = 100;
        this.happiness = Math.floor(Math.random() * (60 - 40) + 40);//Pourcentage de bonheur de base aléatoire entre 60 % et 40 %
        this.deskId = deskId
        this.baseHappiness = this.happiness;
        this.bonusHappiness = 0;
    }

    getProduction() {
        this.updateStats();
        return this.production + this.calculateBonusProduction();
    }

    getSalary() {
        return this.salary;
    }

    getHappiness() {
        return this.baseHappiness + this.bonusHappiness;
    }

    getName() {
        return this.name;
    }

    getDesk() {
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

        //Ecoproject
        //Temps de travail
        //Salaire
    }

    updateStats() {

        let tmpHappinessCounter = 0;
        switch (this.getDesk().level) {
            case 1:
                this.production = 1;
                tmpHappinessCounter = -10;
                break;

            case 2:
                this.production = 2;
                tmpHappinessCounter = -6;
                break;

            case 3:
                this.production = 3;
                tmpHappinessCounter = 0;
                break;

            case 4:
                this.production = 4;
                tmpHappinessCounter = 4;
                break;

            case 5:
                this.production = 5;
                tmpHappinessCounter = 10;
                break;
        }

        





        this.bonusHappiness = tmpHappinessCounter;
    }


}







let nameStr = "Lucas Haboussi,Antoine Mignien,Aurélien Rogé,Guillaume Leroy,Théo Vangheluwe,James Rodriguez,Joseph Levine,Christopher Payne,Robert Camacho,Jose Payne,Matthew Torres,Ryan Ryan,Erik Bishop,Martin Larsson,Tyler Joseph,Josh Dun,Bryce Johnson,Zachary Nguyen,Greg Morris,Michael Eaton Jr.,Ethan Poole,Ryan Hill,Thomas Collins,Kamel Kebir,Kylian Mbappe,Thomas Pesquet,Jean-Luc Leroy,Emmanuel Mignien,Farid Haboussi,Stephane Vangheluwe,Didier Rogé,Roneda Degui,Farouk Baraka,Kevin Gamero,Karim Benzema,Lee Sang-hyeok"
let nameArray = nameStr.split(",");

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomName(array) {
    let randomValue = random(0, array.length);
    let result = array[randomValue];
    array.splice(randomValue, 1);
    return result
}