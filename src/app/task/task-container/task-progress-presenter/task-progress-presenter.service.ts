import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Steps } from '../../task.model';

@Injectable()
export class TaskProgressPresenterService {

  private stepData:Subject<Steps[]>
  public stepData$:Observable<Steps[]>

  constructor(private fb:FormBuilder) { 
    this.stepData = new Subject();
    this.stepData$ = new Observable();
    this.stepData$ = this.stepData.asObservable();
  }

  /**
   * @name builder
   * @returns form group
   */
  public builder(){
    return this.fb.group({
      stepName:['',[Validators.required]]
    })
  }

  /**
   * @name getData
   * @param data 
   * @description receives the data through params
   */
  public getData(data:any){
    this.stepData.next(data)
  }
}
