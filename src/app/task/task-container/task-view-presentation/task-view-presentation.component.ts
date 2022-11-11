import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { employeeModel } from 'src/app/employees/employee.model';
import { taskModule } from '../../task.model';
import { TaskViewPresenterService } from '../task-view-presenter/task-view-presenter.service';

@Component({
  selector: 'app-task-view-presentation',
  templateUrl: './task-view-presentation.component.html',
  viewProviders: [TaskViewPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskViewPresentationComponent implements OnInit {

  @Input() public set taskData(v: taskModule[] | null) {
    if (v)
      this._taskData = v;
  }
  public get taskData(): taskModule[] | null {
    return this._taskData;
  }

  @Input() public set employeeData(v: employeeModel[] | null) {
    if (v)
      this._employeeData = v;
  }
  public get employeeData(): employeeModel[] | null {
    return this._employeeData;
  }

  private _employeeData !: employeeModel[];
  private _taskData !: taskModule[];

  constructor(private service: TaskViewPresenterService) { }

  ngOnInit(): void {

  }

  public onCreate() {
    this.service.openFormOverlay(this._employeeData);
  }
}
