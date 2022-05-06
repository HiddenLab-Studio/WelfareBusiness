class project {
    constructor(amountToProduce, revenue) {
        this.amountToProduce = amountToProduce;
        this.revenue = revenue;

    }

    getAmountToProduce(){
        return this.amountToProduce;
    }

    updateAmountToProduce(amountWorked){
        this.amountToProduce = this.amountToProduce - amountWorked;
    }

    
}