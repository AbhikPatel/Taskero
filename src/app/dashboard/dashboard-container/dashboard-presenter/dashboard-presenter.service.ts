import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DashboardPresenterService {

  public newTask$:Subject<number>;
  public favorite:Subject<number>;
  public deadline:Subject<number>;
  public overDue:Subject<number>;

  public todayDate:Date = new Date();
  public dateCount:number;
  public overDueCount:number;

  constructor() { 
    this.newTask$ = new Subject();
    this.favorite = new Subject();
    this.deadline = new Subject();
    this.overDue = new Subject();
    this.dateCount = 0
    this.overDueCount = 0
  }

  public gettingData(data:any){
    let newTask = data.map((items:any) => items.taskCard.map((card:any) => card.steps.every((step:any) => step.stepStatus === '0')))

    let count = newTask.flat().filter((count:any) => count === true)
    this.newTask$.next(count.length)

    let fav = data.map((items:any) => items.taskCard.filter((task:any) => task.favorite === true))
    this.favorite.next(fav.flat().length)

    data.map((items:any) => items.taskCard.map((task:any) => this.remainingDays(task.deadline)))
    this.deadline.next(this.dateCount)
    this.overDue.next(this.overDueCount)
  }

  public remainingDays(date:any){
    let dueDate = new Date(date)
    var time = dueDate.getTime() - this.todayDate.getTime()
    var deadline = time / (1000 * 3600 * 24)

    if(Math.ceil(deadline) < 4 && Math.ceil(deadline) > 0)
      this.dateCount++

    if(Math.ceil(deadline) < 1)
      this.overDueCount++
  }
}
