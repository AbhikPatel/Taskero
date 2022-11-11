import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { employeeModel } from '../../employee.model';

@Injectable()
export class EmployeeFormPresenterService {

  private formData:Subject<employeeModel>;
  public formData$:Observable<employeeModel>;
  constructor(private fb:FormBuilder) { 
    this.formData = new Subject();
    this.formData$ = new Observable();
    this.formData$ = this.formData.asObservable();
  }

  /**
   * @name formBuilder
   * @returns form group
   */
  public formBuilder(){
    return this.fb.group({
      name:['', [Validators.required, Validators.maxLength(50)]],
      // profile:['', [Validators.required]],
      age:['', [Validators.required, Validators.maxLength(2)]],
      city:['', [Validators.required, Validators.maxLength(20)]],
      gender:['', [Validators.required]],
    })
  }

  public getFormData(data:employeeModel){
    this.formData.next(data);
  }
}
