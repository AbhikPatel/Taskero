import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() public emitData:EventEmitter<taskModule>

  private _employeeData !: employeeModel[];
  private _taskData !: taskModule[];

  public todaysDate:Date = new Date();

  public barColor: 'success' | 'info' | 'warning' | 'danger' = 'info';
  

  constructor(
    private service: TaskViewPresenterService,
    private datepipe:DatePipe
    ) { 
      this.emitData = new EventEmitter();
    }

  ngOnInit(): void {
    this.prop()
  }

  /**
   * @name prop
   * @description This method is called in ngOnInit
   */
  public prop(){
    this.service.FormData$.subscribe((data) => this.emitData.emit(data))
  }

  /**
   * @name onCreate
   * @description this will create an overlay
   */
  public onCreate() {
    this.service.openFormOverlay(this._employeeData, this._taskData);
  }

  /**
   * @name completedTasks
   * @param data 
   * @returns length of completed task
   */
  public completedTasks(data:any){
    let complete = data.filter((item:any) => item.stepStatus === '1')
    
    return complete.length
  }

  /**
   * @name progress
   * @param data 
   * @returns progress of all the steps
   */
  public progress(data:any){
    let complete = data.filter((item:any) => item.stepStatus === '1')
    let total = data.length
    let progress = (complete.length*100)/total

    if(progress < 25)
      this.barColor = 'danger'
    else if(progress > 26 && progress < 100)
      this.barColor = 'warning'
    else
      this.barColor = 'success'

    return Math.round(progress)
  }

  /**
   * @name dueDate
   * @param data 
   * @returns days remaining for the task
   */
  public dueDate(data:any){
    
    let dueDate = new Date(data) 
    
    var time = dueDate.getTime() - this.todaysDate.getTime()

    var deadline = time / (1000 * 3600 * 24)
    
    return Math.ceil(deadline)
  }

  public onCard(data:any){
    this.service.openProgressOverlay(data)
  }
}
