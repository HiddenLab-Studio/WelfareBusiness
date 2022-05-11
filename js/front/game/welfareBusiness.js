//échelle de temps : 8s = 1j avec 1j -> 8h-20h (inutile de mettre la nuit)

class welfareBusiness {
    constructor() {
        this.currentProject = new project(10, 100)
        this.employeesList = new Array();
        this.employeesList[0] = new employee();
        this.updateRate = 2;//update du jeu 2 fois par sec
        this.started = false;
        this.money = 1000;
        this.realProject = true;
    }

    isProjectFinished() {
        if (this.currentProject.getAmountToProduce() <= 0) {
            return true;
        }
        else { return false }
    }

    isRealProject(){
        return this.realProject;
    }

    startGame(){
        this.started = true;
    }

    isGameStarted(){
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
    }

    getGlobalHappiness(){
        let happiness = 0;
        for(let i = 0; i < this.employeesList.length; i++){
            happiness += this.employeesList[i].getHappiness();
        }
        happiness = happiness/this.employeesList.length;
        return happiness;
    }

    getPlayerMoney(){
        return this.money;
    }

    convertToSec(seconds) {
        return seconds * this.updateRate;
    }


    updateProject() {
        if(this.isProjectFinished()){
            console.log("Project finished, waiting for next project");
            this.generate3ProjectChoices()
            this.realProject = false;
            this.money += this.currentProject.getRevenue();
            this.currentProject = new project(999999999,0);//Projet temporaire inutile en attendant un nouveau choix
        }
        else{
            for (let i = 0; i < this.employeesList.length; i++) {
                this.currentProject.updateAmountToProduce(this.employeesList[i].getProduction());
            }
        }
    }


    getCurrentProjectPercentage() {
        return this.currentProject.getProjectPercentage();
    }

    addEmployee() {
        let newEmployee = new employee();
        employeesList.push(newEmployee);
    }

    generate3ProjectChoices() {
        this.proposals = new Array(3);
        this.proposals[0] = this.generateSafeProject();
        this.proposals[1] = this.generateNullProject();
        this.proposals[2] = this.generateAmbitiousProject();
    }

    getProjectChoices(){
        return this.proposals;
    }

    generateSafeProject() {
        let proposal = new project(10,100/*this.getTotalProduction() * this.convertToSec(720), 1000 AMODIFIER QUAND EQUILIBRAGE*/);
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


    chooseNewProject(project){
        this.realProject = true;
        this.currentProject = project;
    }

}