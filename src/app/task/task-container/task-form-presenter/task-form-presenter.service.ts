import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { cardModule } from '../../task.model';

@Injectable()
export class TaskFormPresenterService {

  private getData:Subject<cardModule>
  public getData$:Observable<cardModule>
  constructor(private fb:FormBuilder) { 
    this.getData = new Subject()
    this.getData$ = new Observable()
    this.getData$ = this.getData.asObservable();
  }

  /**
   * @name getFormGroup
   * @returns form group
   */
  public getFormGroup(){
    return this.fb.group({
      taskName:['',[Validators.required, Validators.maxLength(30)]],
      deadline:['',[Validators.required]],
      priority:['',[Validators.required]],
      status:['',[Validators.required]],
      team:['',[Validators.required]],
      steps:this.fb.array([])
    })
  }

  /**
   * @name getFormData
   * @param data 
   */
  public getFormData(data:cardModule){
    data.priority = Math.round(data.priority)
    data.status = Math.round(data.status)
    this.getData.next(data)
  }
}
