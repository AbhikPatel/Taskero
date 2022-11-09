import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { employeeModel } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list-container',
  templateUrl: './employee-list-container.component.html'
})
export class EmployeeListContainerComponent implements OnInit {

  public getEmployeesData$:Observable<employeeModel[]>;
  constructor(private service: EmployeeService) { 
    this.getEmployeesData$ = new Observable();
  }

  ngOnInit(): void {
    this.prop();
  }

  /**
   * @name prop
   * @description This methos is called in ngOnInit
   */
  public prop(){
    this.getEmployeesData$ = this.service.getEmployees();
  }
  

  /**
   * @name emitEmployeesData
   * @param data 
   */
  public emitEmployeesData(data:employeeModel){
    this.service.postEmployee(data).subscribe(() => this.getEmployeesData$ = this.service.getEmployees())
  }

  /**
   * @name emitId
   * @param id 
   */
  public emitId(id:number){
    this.service.deleteEmployee(id).subscribe(() => this.getEmployeesData$ = this.service.getEmployees())
  }
  
  public emitUpdateEmployee(data:employeeModel){
    this.service.updateEmployee(data.id, data).subscribe(() => this.getEmployeesData$ = this.service.getEmployees())
  }

}
