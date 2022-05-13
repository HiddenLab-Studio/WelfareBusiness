class project {
    constructor(amountToProduce, revenue) {
        this.amountToProduce = amountToProduce;
        this.initialAmount = amountToProduce;
        this.revenue = revenue;
    }

    getAmountToProduce() {
        return this.amountToProduce;
    }

    updateAmountToProduce(amountWorked) {
        this.amountToProduce = this.amountToProduce - amountWorked;
    }

    getProjectPercentage() {
        let percentage = (1 - this.amountToProduce / this.initialAmount) * 100;
        return percentage;
    }

    getRevenue() {
        return this.revenue;
    }

}