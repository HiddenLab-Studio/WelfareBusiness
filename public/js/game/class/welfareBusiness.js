//échelle de temps : 8s = 1j avec 1j -> 8h-20h (inutile de mettre la nuit)

class welfareBusiness {
    constructor() {
        this.currentProject = new project(10, 100)
        this.employeesList = new Array();
        //this.employeesList[0] = new employee();
        this.updateRate = 2;//update du jeu 2 fois par sec
        this.started = false;
        this.money = 1000;
        this.realProject = true;
        this.isNewMonthBool = false;

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
            production += this.employeesList[i].getProduction();
        }

        return production;
    }

    getTotalEmployeesCost() {
        let cost = 0;
        for (let i = 0; i < this.employeesList.length; i++) {
            cost = this.employeesList[i].getSalary();
        }

        return cost;
    }

    getGlobalHappiness() {
        let happiness = 0;
        for (let i = 0; i < this.employeesList.length; i++) {
            happiness += this.employeesList[i].getHappiness();
        }
        happiness = happiness / this.employeesList.length;
        return happiness;
    }

    getPlayerMoney() {
        return this.money;
    }

    convertToSec(seconds) {
        return seconds * this.updateRate;
    }

    getEmployeeById(id){
        return this.employeesList[id];
    }

    payWage() {
        this.money -= this.getTotalEmployeesCost();
    }

    updateProject() {
        if (this.isProjectFinished()) {
            this.realProject = false;
            this.money += this.currentProject.getRevenue();
            this.currentProject = new project(999999999, 0);//Projet temporaire inutile en attendant un nouveau choix
        }
        else {
            for (let i = 0; i < this.employeesList.length; i++) {
                this.currentProject.updateAmountToProduce(this.employeesList[i].getProduction());
            }
        }
        this.updateDate();
    }

    updateDate() {
        this.time += 1 // this.updateRate;

        //Changement de jour
        if (this.time == 1) {
            this.date.day++
            this.time = 0;
            this.isNewMonthBool = false;
        }


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

    getDate() {
        return this.date;
    }

    isNewMonth(){
        return this.isNewMonthBool;
    }


    getCurrentProjectPercentage() {
        return this.currentProject.getProjectPercentage();
    }

    addEmployee(desk) {
        let newEmployee = new employee(desk);
        this.employeesList.push(newEmployee);
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
        let proposal = new project(10, 100/*this.getTotalProduction() * this.convertToSec(720), 1000 AMODIFIER QUAND EQUILIBRAGE*/);
        return proposal;
    }

    generateNullProject() {
        let proposal = new project(this.getTotalProduction() * this.convertToSec(720), 1000/*AMODIFIER QUAND ON A LE SYSTEME DE TEMPS)*/)
        return proposal;
    }

    generateAmbitiousProject() {
        let proposal = new project(this.getTotalProduction() * this.convertToSec(900), 1500/*AMODIFIER QUAND ON A LE SYSTEME DE TEMPS)*/)
        return proposal;
    }


    chooseNewProject(project) {
        this.realProject = true;
        this.currentProject = project;
        this.generate3ProjectChoices();
    }

}