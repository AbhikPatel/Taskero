import { Component, Input, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Steps } from '../../task.model';
import { TaskProgressPresenterService } from '../task-progress-presenter/task-progress-presenter.service';

@Component({
  selector: 'app-task-progress-presentation',
  templateUrl: './task-progress-presentation.component.html',
  viewProviders:[TaskProgressPresenterService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TaskProgressPresentationComponent implements OnInit {

  @Input() public steps!:Steps[];
  @Output() public emitStepsData:EventEmitter<Steps[]>

  public stepGroup:FormGroup;
  public barColor: 'success' | 'info' | 'warning' | 'danger' = 'info';

  constructor(private service:TaskProgressPresenterService) { 
    this.stepGroup = this.service.builder()
    this.emitStepsData = new EventEmitter();
  }

  ngOnInit(): void {
    this.prop();
  }

  /**
   * @name prop
   * @description This method is called in ngOnInit
   */
  public prop(){
    this.service.stepData$.subscribe((data:Steps[]) => this.emitStepsData.emit(data))
  }

  /**
   * @name completedTasks
   * @param data 
   * @returns length of completed task
   */
  public completedTasks(data:any){
    let completedTasks = data.filter((item:any) => item.stepStatus === '1')

    return completedTasks.length
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

    if(progress < 26)
      this.barColor = 'danger'
    else if(progress > 26 && progress < 100)
      this.barColor = 'warning'
    else
      this.barColor = 'success'

    return Math.round(progress)
  }

  /**
   * @name onAdd
   * @description To add another step
   */
  public onAdd(){
    let obj = {stepStatus : '0'}
    let data = Object.assign(obj, this.stepGroup.value)
    this.steps.push(data);
    this.stepGroup.reset();
  }

  /**
   * @name onDel
   * @param id 
   * @description This one deletes the step as per id
   */
  public onDel(id:number){
    this.steps.splice(id,1)
    this.progress(this.steps)
  }

  /**
   * @name status
   * @param data 
   * @returns true or false
   * @description For checkbox values
   */
  public status(data:any){   
    if(data.stepStatus === '1')
      return true
    else
      return false
  }

  /**
   * @name onCheck
   * @param data 
   * @description this will check the checkbox and updates the progress bar
   */
  public onCheck(data:any){
    if(data.stepStatus === '0')
      data.stepStatus = '1'
    else
      data.stepStatus = '0'
      
    this.progress(this.steps)
  }

  /**
   * @name onSubmit
   * @description on submit final value will be send to the service
   */
  public onSubmit(){
    this.service.getData(this.steps)
  }
}
