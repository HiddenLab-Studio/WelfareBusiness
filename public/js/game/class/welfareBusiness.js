//échelle de temps : 8s = 1j avec 1j -> 8h-20h (inutile de mettre la nuit)

class welfareBusiness {
    constructor() {
        this.currentProject = new project(10, 100)
        this.employeesList = new Array(12);
        this.employeesNb = 0;
        this.updateRate = 1;
        this.started = false;
        this.money = 1000;
        this.realProject = true;
        this.isNewMonthBool = false;

        this.data = dataManager.getData();

        this.time = 0;//+1 toutes les secondes
        this.date = {
            day: 1,
            month: 1,
            year: 2022,
        }
        this.generate3ProjectChoices()
    }

    isProjectFinished() {
        if (this.currentProject.getAmountToProduce() <= 0) {
            return true;
        }
        else { return false }
    }

    isRealProject() {
        return this.realProject;
    }

    startGame() {
        this.started = true;
    }

    isGameStarted() {
        return this.started;
    }

    getTotalProduction() {
        let production = 0;
        for (let i = 0; i < this.employeesList.length; i++) {
            if (this.employeesList[i] !== undefined) {
                production += this.employeesList[i].getProduction();
            }
        }

        return production;
    }

    getGameSpeed() {
        return this.updateRate;
    }

    setPause(){
        console.log("pause activated");
        this.updateRate = 0;
    }

    setNormalSpeed(){
        console.log("normal speed activated");
        this.updateRate = 1;
    }

    setFastSpeed(){
        this.updateRate = 2;
        console.log("fast speed activated");
    }


    getTotalEmployeesCost() {
        let cost = 0;
        for (let i = 0; i < this.employeesList.length; i++) {
            if (this.employeesList[i] !== undefined) {
                cost = this.employeesList[i].getSalary();
                //!//
            }
        }

        return cost;
    }

    getGlobalHappiness() {
        let happiness = 0;
        for (let i = 0; i < this.employeesList.length; i++) {
            if (this.employeesList[i] !== undefined) {
                happiness += this.employeesList[i].getHappiness();
            }
        }
        happiness = happiness / this.employeesNb;
        return happiness;
    }

    getPlayerMoney() {
        return this.money;
    }

    
    getEmployeeById(id) {
        return this.employeesList[id];
    }

    payWage() {
        this.money -= this.getTotalEmployeesCost();
    }

    updateGame(){
        if(this.updateRate > 0){
            this.updateProject();
        }
        else{
            this.updateDate();
        }
    }

    updateProject() {
        if (this.isProjectFinished()) {
            this.realProject = false;
            this.money += this.currentProject.getRevenue();
            this.currentProject = new project(999999999, 0);//Projet temporaire inutile en attendant un nouveau choix
        }
        else {
            for (let i = 0; i < this.employeesList.length; i++) {
                if (this.employeesList[i] !== undefined) {
                    this.currentProject.updateAmountToProduce(this.employeesList[i].getProduction());
                }
            }
        }
        this.updateDate();
    }

    updateDate() {
        this.time += this.updateRate / 4;
        this.isNewMonthBool = false;

        //Changement de jour
        if (this.time >= 1) {
            this.date.day++
            this.time = 0;
        }

        if (this.time === 0) {
            //Changement de mois
            if (this.date.day == 29) {
                if (this.date.month == 2) {
                    this.date.month++;
                    this.date.day -= 28;
                    this.isNewMonthBool = true;
                    this.payWage();
                }
            }
            if (this.date.day == 31) {
                if (this.date.month == 4 || this.date.month == 6 || this.date.month == 9 || this.date.month == 11) {
                    this.date.month++;
                    this.date.day -= 30;
                    this.isNewMonthBool = true;
                    this.payWage();
                }
            }
            if (this.date.day == 32) {
                if (this.date.month == 1 || this.date.month == 3 || this.date.month == 5 || this.date.month == 7 || this.date.month == 8 || this.date.month == 10 || this.date.month == 12) {
                    this.date.month++;
                    this.date.day -= 31;
                    this.isNewMonthBool = true;
                    this.payWage();
                }
            }

            //Changement d'année
            if (this.date.month == 13) {
                this.date.day = 1;
                this.date.month = 1;
                this.date.year++;
            }

        }

    }

    getDate() {
        return this.date;
    }

    isNewMonth() {
        return this.isNewMonthBool;
    }


    getCurrentProjectPercentage() {
        return this.currentProject.getProjectPercentage();
    }

    addEmployee(deskData) {
        let newEmployee = new employee(deskData.id);
        this.employeesList[deskData.id] = newEmployee;
        let data = dataManager.getData();
        data.desk[deskData.id].employee = newEmployee;
        this.employeesNb++;
        dataManager.save("1", data);
    }

    generate3ProjectChoices() {
        this.proposals = new Array(3);
        this.proposals[0] = this.generateSafeProject();
        this.proposals[1] = this.generateNullProject();
        this.proposals[2] = this.generateAmbitiousProject();
    }

    getProjectChoices() {
        return this.proposals;
    }

    generateSafeProject() {
        let proposal = new project(10, 100/*this.getTotalProduction() * convertToSec(720, this.updateRate), 1000 AMODIFIER QUAND EQUILIBRAGE*/);
        return proposal;
    }

    generateNullProject() {
        let proposal = new project(this.getTotalProduction() * convertToSec(720, this.updateRate), 1000/*AMODIFIER QUAND ON A LE SYSTEME DE TEMPS)*/)
        return proposal;
    }

    generateAmbitiousProject() {
        let proposal = new project(this.getTotalProduction() * convertToSec(900, this.updateRate), 1500/*AMODIFIER QUAND ON A LE SYSTEME DE TEMPS)*/)
        return proposal;
    }


    chooseNewProject(project) {
        this.realProject = true;
        this.currentProject = project;
        this.generate3ProjectChoices();
    }

}

function convertToSec(seconds, updateRate) {
    return seconds * updateRate;
}
