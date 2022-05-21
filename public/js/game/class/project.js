class project {
    constructor(amountToProduce, revenue, happinessImpact, title) {
        this.randomCoef = Math.random() * (1.10 - 0.9) + 0.9
        
        this.amountToProduce = Math.round(amountToProduce * this.randomCoef);
        this.initialAmount = this.amountToProduce;
        this.revenue = Math.round(revenue * this.randomCoef);
        this.happinessImpact = happinessImpact;
        this.title = title
    }

    getAmountToProduce() {
        return this.amountToProduce;
    }

    updateAmountToProduce(amountWorked) {
        this.amountToProduce = this.amountToProduce - amountWorked;
    }

    getProjectPercentage() {
        let percentage = (1 - this.amountToProduce / this.initialAmount) * 100;

        if(percentage >= 100){
            percentage = 100;
        }

        return percentage;
    }

    getRevenue() {
        return this.revenue;
    }

    getHappinessImpact(){
        return this.happinessImpact;
    }

    getTitle(){
        if(this.title === undefined){
            return 'Project unnamed'
        }
        else{
            return this.title;
        }
    }
}