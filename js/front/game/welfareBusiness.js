//échelle de temps : 8s = 1j avec 1j -> 8h-20h (inutile de mettre la nuit)

class welfareBusiness {
    constructor() {
        this.currentProject = new project(1000, 100)
        this.employeesList = new Array();
        this.employeesList[0] = new employee();
        this.updateRate = 2 //update du jeu 2 fois par sec
    }

    getTotalProduction() {
        let production = 0;
        for (let i = 0; i < this.employeesList.length; i++) {
            production += this.employeesList[i].getProduction();
        }

        return production;
    }

    getTotalEmployeesCost(){
        let cost = 0;
        for(let i = 0; i < this.employeesList.length; i++){
            cost = this.employeesList[i].getSalary();
        }
    }

    convertToSec(seconds){
        return seconds * this.updateProject;
    }

    



    updateProject() {
        for (let i = 0; i < this.employeesList.length; i++) {
            this.currentProject.updateAmountToProduce(this.employeesList[i].getProduction());
        }
        console.log("Amount left to produce :");
        console.log(this.currentProject.getAmountToProduce());
    }

    getCurrentProjectPercentage() {
        return this.currentProject.getProjectPercentage();
    }

    addEmployee() {
        let newEmployee = new employee();
        employeesList.push(newEmployee);
    }

    generate3ProjectChoices() {
        proposals = new Array(3);
        proposal[0] = this.generateSafeProject();
        proposal[1] = this.generateNullProject();
        proposal[2] = this.generateAmbitiousProject();
    }

    generateSafeProject() {
        let proposal = new project(this.getTotalProduction()*this.convertToSec(720), 1000/*AMODIFIER QUAND ON A LE SYSTEME DE TEMPS)*/);
        return proposal;
    }

    generateNullProject() {
        let proposal = new project(this.getTotalProduction()*this.convertToSec(720), 1000/*AMODIFIER QUAND ON A LE SYSTEME DE TEMPS)*/)
        return proposal;
    }

    generateAmbitiousProject() {
        let proposal = new project(this.getTotalProduction()*this.convertToSec(900), 1500/*AMODIFIER QUAND ON A LE SYSTEME DE TEMPS)*/)
        return proposal;
    }
}