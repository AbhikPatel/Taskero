import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EmployeeFilterPresenterService } from '../employee-filter-presenter/employee-filter-presenter.service';

@Component({
  selector: 'app-employee-filter-presentation',
  templateUrl: './employee-filter-presentation.component.html',
  viewProviders:[EmployeeFilterPresenterService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EmployeeFilterPresentationComponent implements OnInit {

  @Input() pastedData:any;
  @Output() emitFilterForm:EventEmitter<any>;
  filterGroup:FormGroup;
  constructor(private service:EmployeeFilterPresenterService) { 
    this.filterGroup = this.service.builderForm();
    this.emitFilterForm = new EventEmitter();
  }

  ngOnInit(): void {
    this.prop();
  }

  /**
   * @name prop
   * @description this method is called in ngOnInit
   */
  public prop(){
    this.service.filterform$.subscribe((data:any) => this.emitFilterForm.emit(data))

    if(this.pastedData)
      this.filterGroup.patchValue(this.pastedData)
  }

  /**
   * @name onSubmit
   * @description on submit data will be send to presenter
   */
  public onSubmit(){
    this.service.getFilterForm(this.filterGroup.value)
  }

}
