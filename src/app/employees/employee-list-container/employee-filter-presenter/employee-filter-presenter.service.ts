import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class EmployeeFilterPresenterService {

  private filterform:Subject<any>;
  public filterform$:Observable<any>;
  constructor(private fb:FormBuilder) { 
    this.filterform = new Subject()
    this.filterform$ = new Observable()
    this.filterform$ = this.filterform.asObservable()
  }

  /**
   * @name builderForm
   * @returns group of the form
   */
  public builderForm(){
    return this.fb.group({
      age:[''],
      city:[''],
      gender:['']
    })
  }

  /**
   * @name getFilterForm
   * @param data
   * @description gets the filter value
   */
  public getFilterForm(data:any){
    this.filterform.next(data)
  }
}
