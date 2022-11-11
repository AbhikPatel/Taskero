export class taskModule{
    id:number
    taskCol:string
    taskCard:cardModule[]

    constructor(
        id:number,
        taskCol:string,
        taskCard:cardModule[],
    ){
        this.id = id
        this.taskCol = taskCol
        this.taskCard = taskCard
    }
}

export class cardModule{
    taskName:string
    deadline:Date
    priority:string
    status:string
    team:Employees[]
    steps:Steps[]
    
    constructor(
        taskName:string,
        deadline:Date,
        priority:string,
        status:string,
        team:Employees[],
        steps:Steps[],
        ){
            this.taskName = taskName
            this.deadline = deadline
            this.priority = priority
            this.status = status
            this.team = team
            this.steps = steps
        }
}

export class Employees{
    id:number
    name:string

    constructor(
        id:number,
        name:string,
    ){
        this.id = id
        this.name = name
    }
}

export class Steps{
    stepName:string
    stepStatus:string

    constructor(
        stepName:string,
        stepStatus:string,
    ){
        this.stepName = stepName
        this.stepStatus = stepStatus
    }
}