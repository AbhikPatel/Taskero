export class employeeModel{
    id:number
    fullname:string
    age:number
    gender:string
    city:string

    constructor(id:number, fullname:string, age:number, gender:string, city:string){
        this.id = id
        this.fullname = fullname
        this.age = age
        this.gender = gender
        this.city = city
    }
}