class welfareBusiness {
    constructor() {
        this.currentProject = new project(1000, 100)
        this.employeesList = new Array();
        this.employeesList[0] = new employee();
    }

    updateProject() {
        for (let i = 0; i < this.employeesList.length; i++) {
            this.currentProject.updateAmountToProduce(this.employeesList[i].getProduction());
        }
        console.log("Amount left to produce :");
        console.log(this.currentProject.getAmountToProduce());
    }

    addEmployee() {
        let newEmployee = new employee();
        employeesList.push(newEmployee);
    }
}