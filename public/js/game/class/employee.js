class employee {
    constructor() {
        this.name = 'TBD';
        this.production = 1;
        this.salary = 10;
        this.happiness = Math.floor(Math.random() * (60 - 40) + 40);//Pourcentage de bonheur de base aléatoire entre 60 % et 40 %
    }

    getProduction() {
        console.log(this.calculateBonusProduction())// + this.calculateBonusProduction())
        return this.production + this.calculateBonusProduction();
    }

    getSalary() {
        return this.salary;
    }

    getHappiness() {
        return this.happiness;
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
}