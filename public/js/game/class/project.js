class project {
    constructor(amountToProduce, revenue, happinessImpact, title) {
        this.amountToProduce = amountToProduce;
        this.initialAmount = amountToProduce;
        this.revenue = revenue;
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

        if(percentage > 100){
            percentage = 100;
        }

        return percentage;
    }

    getRevenue() {
        return this.revenue;
    }

    getHappinessImpact(){
        console.log(this.happinessImpact)
        return this.happinessImpact;
    }

    getTitle(){
        if(this.title == undefined){
            return 'Project unnamed'
        }
        else{
            return this.title;
        }
    }
}