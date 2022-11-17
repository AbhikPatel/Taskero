import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cardModule } from '../../task.model';
import { TaskFormPresenterService } from '../task-form-presenter/task-form-presenter.service';

@Component({
  selector: 'app-task-form-presentation',
  templateUrl: './task-form-presentation.component.html',
  viewProviders: [TaskFormPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormPresentationComponent implements OnInit {

  @Input() public Employees!: any[];
  @Input() public editData!: cardModule;

  @Output() public emitFormData: EventEmitter<cardModule>
  @ViewChild('multiSelect') multiSelect: any;

  public taskGroup: FormGroup
  public settings: any = {}

  constructor(
    private service: TaskFormPresenterService,
    private fb: FormBuilder
  ) {
    this.taskGroup = this.service.getFormGroup();
    this.emitFormData = new EventEmitter();
  }

  ngOnInit(): void {
    this.prop();
  }

  /**
   * @name prop
   * @description This method is called in ngOnInit
   */
  public prop() {

    this.settings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true,
      limitSelection: 5,
      clearSearchFilter: true,
      maxHeight: 197,
      itemsShowLimit: 5,
      searchPlaceholderText: 'Search',
      noDataAvailablePlaceholderText: 'No Data Found',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    }

    this.onAdd();

    this.service.getData$.subscribe((data: cardModule) => this.emitFormData.emit(data))

    if (this.editData) {
      this.taskGroup.patchValue(this.editData)
      this.taskGroup.get('taskName')?.disable()
      
      if(this.editData.status === 2)
        this.taskGroup.get('status')?.disable()

    }
  }

  /**
   * @name onSubmit
   * @description This method is call when the form is submitted
   */
  public onSubmit() {
    if (this.editData) {
      let obj = { taskName: this.editData.taskName }
      this.taskGroup.value.steps = this.editData.steps
      let formData = Object.assign(obj, this.taskGroup.value)
      if(this.editData.status === 2){
        let obj = {status: 2}
        formData = Object.assign(obj, formData)
      }
      this.service.getFormData(formData)
    } else 
    
      this.service.getFormData(this.taskGroup.value)
  }

  /**
   * @name formarr
   * @param arrname 
   * @returns formcontrols
   */
  public formarr(arrname: any): FormArray {
    return this.taskGroup.controls[arrname] as FormArray;
  }

  /**
   * @name onAdd
   * @description To add step in the form
   */
  public onAdd() {
    if (this.formarr('steps').length < 10) {
      this.formarr('steps').push(
        this.fb.group({
          stepName: ['', Validators.required],
          stepStatus: ['', Validators.required]
        })
      )
    }
  }

  /**
   * @name removeStep
   * @param index 
   * @description this removes the step in the form
   */
  public removeStep(index: number) {
    if (this.formarr('steps').length != 1)
      this.formarr('steps').removeAt(index);
  }

  /**
   * @name getControls
   * @description get controls of the form
   */
  public get getControls() {
    return this.taskGroup['controls']
  }

}
