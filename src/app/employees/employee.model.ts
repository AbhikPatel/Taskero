export class employeeModel{
    id:number
    name:string
    age:number
    gender:string
    city:string

    constructor(id:number, name:string, age:number, gender:string, city:string){
        this.id = id
        this.name = name
        this.age = age
        this.gender = gender
        this.city = city
    }
}