import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class TaskProgressPresenterService {

  constructor(private fb:FormBuilder) { }

  public builder(){
    return this.fb.group({
      stepName:['',[Validators.required]]
    })
  }
}
