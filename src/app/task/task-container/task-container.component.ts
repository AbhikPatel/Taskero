import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { employeeModel } from 'src/app/employees/employee.model';
import { GetDataService } from 'src/app/shared/get-data.service';
import { taskModule } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html'
})
export class TaskContainerComponent implements OnInit {

  public getEmployees$: Observable<employeeModel[]>
  public getTasks$: Observable<taskModule[]>
  constructor(
    private sharedService: GetDataService,
    private service: TaskService
    ) {
    this.getEmployees$ = new Observable();
    this.getTasks$ = new Observable();
  }

  ngOnInit(): void {
    this.prop();
  }

  /**
   * @name prop
   * @description This method is called in ngOnInit
   */
  public prop() {
    this.getEmployees$ = this.sharedService.getEmployees()
    this.getTasks$ = this.sharedService.getTasks()
  }

  public emitData(data:taskModule){
    this.service.updateTaskData(data, data.id).subscribe(() => this.getTasks$ = this.sharedService.getTasks())
  }

}
