import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { employeeModel } from '../../employee.model';
import { EmployeeFormPresenterService } from '../employee-form-presenter/employee-form-presenter.service';

@Component({
  selector: 'app-employee-form-presentation',
  templateUrl: './employee-form-presentation.component.html',
  viewProviders:[EmployeeFormPresenterService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EmployeeFormPresentationComponent implements OnInit {

  @Input() public editEmployee!:employeeModel;
  @Output() public emitFormData:EventEmitter<employeeModel>;
  @Output() public emitUpdateData:EventEmitter<employeeModel>;

  public EmployeeGroup:FormGroup;
  public editmode:boolean;

  constructor(private service:EmployeeFormPresenterService) { 
    this.EmployeeGroup = this.service.formBuilder();
    this.emitFormData = new EventEmitter();
    this.emitUpdateData = new EventEmitter();
    this.editmode = false;
  }

  ngOnInit(): void {
    this.prop()
  }

  /**
   * @name prop
   * @description This method is called in ngOnInit
   */
  public prop(){
    this.service.formData$.subscribe((data:employeeModel) => this.editmode ? this.emitUpdateData.emit(data) : this.emitFormData.emit(data));

    if(this.editEmployee){
      this.EmployeeGroup.patchValue(this.editEmployee);
      this.editmode = true;
    }
  }

  /**
   * @name onSubmit
   * @description when clicked on submit
   */
  public onSubmit(){
    this.service.getFormData(this.EmployeeGroup.value)
  }

  /**
   * @name getControls
   * @description This will get controls of all the properties
   */
  public get getControls(){
    return this.EmployeeGroup['controls'];
  }
}
