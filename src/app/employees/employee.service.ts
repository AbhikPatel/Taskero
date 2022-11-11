import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { employeeModel } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public api:string;
  constructor(private http:HttpClient) { 
    this.api = environment.baseURL
  }

  /**
   * @name postEmployee
   * @param data 
   * @returns Post call for Employees Data
   */
  public postEmployee(data:employeeModel):Observable<employeeModel>{
    return this.http.post<employeeModel>(`${this.api}/employees`, data);
  }

  /**
   * @name deleteEmployee
   * @param id 
   * @returns deletes the employee whit the required id
   */
  public deleteEmployee(id:number):Observable<employeeModel>{
    return this.http.delete<employeeModel>(`${this.api}/employees/${id}`)
  }
  
  /**
   * @name updateEmployee
   * @param id 
   * @param data 
   * @returns updates the employee data 
   */
  public updateEmployee(id:number, data:employeeModel):Observable<employeeModel>{
    return this.http.put<employeeModel>(`${this.api}/employees/${id}`, data)
  }

}
