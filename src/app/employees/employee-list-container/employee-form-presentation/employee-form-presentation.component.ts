import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  public editMode:boolean;
  public base64: string;
  public fileSelected?:Blob;

  constructor(
    private service:EmployeeFormPresenterService
    ) { 
    this.EmployeeGroup = this.service.formBuilder();
    this.emitFormData = new EventEmitter();
    this.emitUpdateData = new EventEmitter();
    this.editMode = false;
    this.base64 = '';
  }

  ngOnInit(): void {
    this.prop()
  }


  /**
   * @name prop
   * @description This method is called in ngOnInit
   */
  public prop(){
    this.service.formData$.subscribe((data:employeeModel) => this.editMode ? this.emitUpdateData.emit(data) : this.emitFormData.emit(data));

    if(this.editEmployee){
      this.EmployeeGroup.get('name')?.patchValue(this.editEmployee.name);
      this.EmployeeGroup.get('age')?.patchValue(this.editEmployee.age);
      this.EmployeeGroup.get('gender')?.patchValue(this.editEmployee.gender);
      this.EmployeeGroup.get('city')?.patchValue(this.editEmployee.city);
      this.EmployeeGroup.controls['profile'].clearValidators();
      this.editMode = true;
    }
  }

  /**
   * @name onSubmit
   * @description when clicked on submit
   */
  public onSubmit(){
    this.EmployeeGroup.value.profile = this.base64

    if(this.editMode && this.EmployeeGroup.value.profile === '')
      this.EmployeeGroup.value.profile = this.editEmployee.profile
    
    this.service.getFormData(this.EmployeeGroup.value)
  }

  /**
   * @name getControls
   * @description This will get controls of all the properties
   */
  public get getControls(){
    return this.EmployeeGroup['controls'];
  }

  /**
   * @name onSelectFile
   * @param event 
   * @description This method converts image into base64
   */
  public onSelectFile(event: any){
    let reader = new FileReader();
    this.fileSelected = event.target?.files[0];

    reader.readAsDataURL(this.fileSelected as Blob)
    reader.onloadend = () => {this.base64 = reader.result as string}
  }


}
