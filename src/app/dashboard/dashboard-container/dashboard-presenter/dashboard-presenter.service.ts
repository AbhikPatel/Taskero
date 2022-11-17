import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DashboardPresenterService {

  public newTask$:Subject<number>;
  constructor() { 
    this.newTask$ = new Subject();
  }

  public gettingData(data:any){
    let newTask = data.map((items:any) => items.taskCard.map((card:any) => card.steps.every((step:any) => step.stepStatus === '0')))

    let count = newTask.flat().filter((count:any) => count === true)
    this.newTask$.next(count.length)
  }
}
