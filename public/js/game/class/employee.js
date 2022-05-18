class employee {
    constructor(deskId) {
        this.name = getRandomName(nameArray);
        this.production = 1;
        this.salary = 1300;
        this.happiness = Math.floor(Math.random() * (60 - 40) + 40);//Pourcentage de bonheur de base aléatoire entre 60 % et 40 %
        this.deskId = deskId
        this.baseHappiness = this.happiness;
        this.bonusHappiness = 0;

        this.workTime = 7;
    }

    getProduction() {
        this.updateStats();
        return this.production + this.calculateBonusProduction();
    }

    getSalary() {
        return this.salary;
    }

    getSalaryPercent(){
        let tmpPercent = this.salary - 1300;

        tmpPercent = tmpPercent / 4000 * 100;
        if(tmpPercent > 100){
            tmpPercent = 100
        }

        return tmpPercent;
    }

    getHappiness() {
        let happiness = this.baseHappiness + this.bonusHappiness
        if(happiness > 100){
            return 100;
        }
        return happiness;
    }

    getName() {
        return this.name;
    }

    getDesk() {
        return dataManager.getData().desk[this.deskId];
    }

    getWorkTime(){
        return this.workTime;
    }

    getWorkTimePercent(){
        let tmpPercent = this.workTime - 5;

        tmpPercent = tmpPercent / 7 * 100

        return tmpPercent
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
        //Salaire FAIT
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

        tmpHappinessCounter += salaryScaleToWelfare(this.salary);


        this.bonusHappiness = tmpHappinessCounter;
    }

    increaseWage() {
        this.salary += 100;
    }

    decreaseWage() {
        if (this.salary > 1402) {
            this.salary -= 100;
        }
    }

    increaseWorkTime(){
        if(this.workTime <= 11){
            this.workTime += 1;
        }
    }

    decreaseWorkTime(){
        if(this.workTime >= 6){
            this.workTime -= 1;
        }
    }


}

//Fonction qui prend en paramètre le salaire de l'employé et retourne le bonheur correspondant. AMODIFIER
function salaryScaleToWelfare(salary) {
    let tmpWelfare = 2 * ((2 * salary / 1302) - 3);//2000€ de salaire = 0 de bonheur bonus

    if (tmpWelfare < 0) {
        return (tmpWelfare * 3)
    }
    if (tmpWelfare < 4) {
        return (tmpWelfare * 2)
    }
    if (tmpWelfare > 4) {
        return 8 + (tmpWelfare - 4)
    }

    return tmpWelfare
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

