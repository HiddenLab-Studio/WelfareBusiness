//échelle de temps : 8s = 1j avec 1j -> 8h-20h (inutile de mettre la nuit)

class welfareBusiness {
    constructor() {
        this.currentProject = new project(1, 0, 0)
        this.employeesList = new Array(12);
        this.employeesNb = 0;
        this.updateRate = 1;
        this.started = false;
        this.money = 1000000;
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

    getNbOfEmployees(){
        return this.employeesNb;
    }
    
    getAverageSalary() {
        let averageSalary = 0;
        for (let i = 0; i < this.employeesList.length; i++) {
            if (this.employeesList[i] != undefined) {
                averageSalary += this.employeesList[i].getSalary();
            }
        }
        averageSalary = averageSalary / this.employeesNb;
        return averageSalary;
    }

    getAverageSalaryPercent() {
        let tmpPercent = this.getAverageSalary() - 1300;

        tmpPercent = tmpPercent / 4000 * 100;
        if (tmpPercent > 100) {
            tmpPercent = 100
        }
        return tmpPercent;
    }

    increaseAverageSalary() {
        for (let i = 0; i < this.employeesList.length; i++) {
            if (this.employeesList[i] != undefined) {
                this.employeesList[i].increaseWage();
            }
        }
    }

    decreaseAverageSalary() {
        for (let i = 0; i < this.employeesList.length; i++) {
            if (this.employeesList[i] != undefined) {
                if (this.employeesList[i].getSalary() >= 1400) {
                    this.employeesList[i].decreaseWage();
                }
            }
        }
    }


    getAverageWorkTime() {
        let averageWorkTime = 0;
        for (let i = 0; i < this.employeesList.length; i++) {
            if (this.employeesList[i] != undefined) {
                averageWorkTime += this.employeesList[i].getWorkTime();
            }
        }
        averageWorkTime = averageWorkTime / this.employeesNb;
        return averageWorkTime;
    }

    getAverageWorkTimePercent() {
        let tmpPercent = this.getAverageWorkTime() - 5;

        tmpPercent = tmpPercent / 7 * 100

        return tmpPercent
    }

    increaseAverageWorkTime() {
        for (let i = 0; i < this.employeesList.length; i++) {
            if (this.employeesList[i] != undefined) {
                this.employeesList[i].increaseWorkTime();
            }
        }
    }

    decreaseAverageWorkTime() {
        for (let i = 0; i < this.employeesList.length; i++) {
            if (this.employeesList[i] != undefined) {
                if (this.employeesList[i].getWorkTime() >= 6) {
                    this.employeesList[i].decreaseWorkTime();
                }
            }
        }
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

    setPause() {
        this.updateRate = 0;
    }

    setNormalSpeed() {
        this.updateRate = 1;
    }

    setFastSpeed() {
        this.updateRate = 2;
    }


    getTotalEmployeesCost() {
        let cost = 0;
        for (let i = 0; i < this.employeesList.length; i++) {
            if (this.employeesList[i] !== undefined) {
                cost += this.employeesList[i].getSalary();
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

    payAmount(amount) {
        this.money -= amount;
    }

    getEmployeeById(id) {
        return this.employeesList[id];
    }

    payWage() {
        this.money -= this.getTotalEmployeesCost();
    }

    updateGame() {
        if (this.updateRate > 0) {
            this.updateProject();
        }
        else {
            this.updateDate();
        }
    }

    updateProject() {
        if (this.isProjectFinished()) {
            this.realProject = false;
            this.money += this.currentProject.getRevenue();
            mapManager.getHud().generateEndOfProjectMessage(this.currentProject.getRevenue())
            this.generate3ProjectChoices()
            this.currentProject = new project(99999999999, 0, -1);//Projet temporaire inutile en attendant un nouveau choix et malus de 1 de bonheur car ils ne font rien
        }
        else {
            for (let i = 0; i < this.employeesList.length; i++) {
                if (this.employeesList[i] !== undefined) {
                    this.employeesList[i].setCurrentProjectHappiness(this.currentProject.getHappinessImpact())
                    if (isEmployeeWorking(this.employeesList[i].getWorkTime(), this.getTime())) {
                        this.currentProject.updateAmountToProduce(this.employeesList[i].getProduction());
                        deskManager.employeeGetOut(this.employeesList[i].deskId, false)
                    } else {
                        deskManager.employeeGetOut(this.employeesList[i].deskId, true)
                    }
                }
            }
        }
        this.updateDate();
    }

    updateDate() {
        this.time += this.updateRate // 12;
        this.isNewMonthBool = false;

        //Changement de jour
        if (this.time >= 12) {
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

    getTime() {
        return this.time;
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
        // On set les données de l'employé (pour le load)
        if (data.desk[deskData.id].employee !== undefined) {
            newEmployee.name = data.desk[deskData.id].employee.name;
            newEmployee.salary = data.desk[deskData.id].employee.salary;
            newEmployee.workTime = data.desk[deskData.id].employee.workTime;
            newEmployee.happiness = data.desk[deskData.id].employee.happiness;
            newEmployee.baseHappiness = data.desk[deskData.id].employee.baseHappiness;
            newEmployee.bonusHappiness = data.desk[deskData.id].employee.bonusHappiness;
            newEmployee.production = data.desk[deskData.id].employee.production;
            newEmployee.deskId = data.desk[deskData.id].employee.deskId;
        }

        // On update l'employé dans le json
        data.desk[deskData.id].employee = newEmployee;

        this.employeesNb++;
        dataManager.save("1", data);
    }

    generate3ProjectChoices() {
        this.proposals = new Array(3);
        for (let i = 0; i < 3; i++) {
            let tmpRand = random(0, 9);
            switch (tmpRand) {
                case 0: case 1: case 2:
                    this.proposals[i] = this.generateSafeProject();
                    break;

                case 3: case 4: case 5:
                    this.proposals[i] = this.generateNullProject();
                    break;

                case 6: case 7:

                    this.proposals[i] = this.generateAmbitiousProject();
                    break;

                case 8: case 9:
                    this.proposals[i] = this.generateEcoProject();
                    break;
            }
        }
    }

    getProjectChoices() {
        return this.proposals;
    }

    generateSafeProject() {
        let proposal = new project(this.getTotalProduction() * convertToSec(6, 3), this.getTotalProduction() * 15, 5, 'Short project');
        return proposal;
    }

    generateNullProject() {
        let proposal = new project(this.getTotalProduction() * convertToSec(7, 3), this.getTotalProduction() * 20, 0, 'SQL Project')
        return proposal;
    }

    generateAmbitiousProject() {
        let proposal = new project(this.getTotalProduction() * 2 * convertToSec(9, 3), this.getTotalProduction() * 75, -15, 'Time consuming project')
        return proposal;
    }

    generateEcoProject() {
        let proposal = new project(this.getTotalProduction() * convertToSec(9, 3), this.getTotalProduction() * 20, 20, 'Ecoproject')
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

function isEmployeeWorking(employeeWorkTime, time) {
    if (employeeWorkTime - time > 0) {
        return true;
    }
    return false;
}

