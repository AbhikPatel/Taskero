import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TaskFilterPresenterService } from '../task-filter-presenter/task-filter-presenter.service';

@Component({
  selector: 'app-task-filter-presentation',
  templateUrl: './task-filter-presentation.component.html',
  viewProviders:[TaskFilterPresenterService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TaskFilterPresentationComponent implements OnInit {

  @Output() public emitFilterForm:EventEmitter<any>;

  public filterGroup:FormGroup
  constructor(
    private service:TaskFilterPresenterService
    ) { 
    this.filterGroup = this.service.formBuilder()
    this.emitFilterForm = new EventEmitter();
  }

  ngOnInit(): void {
    this.prop();
  }

  /**
   * @name prop
   * @description This method is called in ngOnInit
   */
  public prop(){
    this.service.filterForm$.subscribe((data) => this.emitFilterForm.emit(data))
  }

  /**
   * @name onSubmit
   * @description This method is called when form is submitted
   */
  public onSubmit(){
    let form = this.filterGroup.value

    if(form.favorite === 'true')
      form.favorite = true

    if(form.favorite === 'false')
      form.favorite = false 
     
    if(form.priority === '')
      form.priority = null

    form.priority = Math.ceil(form.priority)

    this.service.getFormData(form)
  }
}
