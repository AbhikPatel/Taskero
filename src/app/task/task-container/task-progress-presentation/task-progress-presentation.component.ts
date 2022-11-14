import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
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

  public stepGroup:FormGroup;
  public barColor: 'success' | 'info' | 'warning' | 'danger' = 'info';

  constructor(private service:TaskProgressPresenterService) { 
    this.stepGroup = this.service.builder()
  }

  ngOnInit(): void {
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

    if(progress < 25)
      this.barColor = 'danger'
    else if(progress > 26 && progress < 100)
      this.barColor = 'warning'
    else
      this.barColor = 'success'

    return Math.round(progress)
  }

  public onAdd(){
    let obj = {stepStatus : '0'}
    let data = Object.assign(obj, this.stepGroup.value)
    this.steps.push(data);
    this.stepGroup.reset();
  }

  public onDel(id:number){
    this.steps.splice(id,1)
    this.progress(this.steps)
  }

  public status(data:any){
    if(data.stepStatus === '0')
      return false
    else
      return true
  }
}
