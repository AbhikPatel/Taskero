import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class DashboardPresenterService {

  public newTask$:Subject<number>;
  public favorite:Subject<number>;
  constructor() { 
    this.newTask$ = new Subject();
    this.favorite = new Subject();
  }

  public gettingData(data:any){
    let newTask = data.map((items:any) => items.taskCard.map((card:any) => card.steps.every((step:any) => step.stepStatus === '0')))

    let count = newTask.flat().filter((count:any) => count === true)
    this.newTask$.next(count.length)

    let fav = data.map((items:any) => items.taskCard.filter((task:any) => task.favorite === true))
    this.favorite.next(fav.flat().length)
  }
}
