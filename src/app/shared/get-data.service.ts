import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { employeeModel } from '../employees/employee.model';
import { taskModule } from '../task/task.model';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  public api:string;
  constructor(private http:HttpClient) { 
    this.api = environment.baseURL
  }

  /**
   * @name getEmployees
   * @returns get all the data of Employees
   */
   public getEmployees():Observable<employeeModel[]>{
    return this.http.get<employeeModel[]>(`${this.api}/employees`);
  }

  /**
   * @name getEmployees
   * @returns get all the data of Employees
   */
   public getTasks():Observable<taskModule[]>{
    return this.http.get<taskModule[]>(`${this.api}/task`);
  }
}
