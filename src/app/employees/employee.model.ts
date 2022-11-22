export class employeeModel{
    id:number
    name:string
    age:number
    gender:string
    city:string
    profile:Blob

    constructor(
        id:number, 
        name:string, 
        age:number, 
        gender:string, 
        city:string, 
        profile:Blob
        ){
        this.id = id
        this.name = name
        this.age = age
        this.gender = gender
        this.city = city
        this.profile = profile
    }
}