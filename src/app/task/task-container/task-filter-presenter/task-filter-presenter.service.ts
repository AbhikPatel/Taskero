import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class TaskFilterPresenterService {

  private filterForm:Subject<any>;
  public filterForm$:Observable<any>;
  constructor(private fb:FormBuilder) { 
    this.filterForm = new Subject()
    this.filterForm$ = new Observable()
    this.filterForm$ = this.filterForm.asObservable()
  }

  /**
   * @name formBuilder
   * @returns form group
   */
  public formBuilder(){
    return this.fb.group({
      priority:[''],
      favorite:['']
    })
  }

  /**
   * @name getFormData
   * @param data 
   * @description The form data is stored in the subject
   */
  public getFormData(data:any){
    this.filterForm.next(data);
  }
}
