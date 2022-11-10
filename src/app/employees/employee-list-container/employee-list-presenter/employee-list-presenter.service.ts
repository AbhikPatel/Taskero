import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { EmployeeFormPresentationComponent } from '../employee-form-presentation/employee-form-presentation.component';
import { employeeModel } from '../../employee.model';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';
import { EmployeeFilterPresentationComponent } from '../employee-filter-presentation/employee-filter-presentation.component';

@Injectable()
export class EmployeeListPresenterService {

  private employeesData:Subject<employeeModel>;
  public employeesData$:Observable<employeeModel>;

  private updatedEmployee:Subject<employeeModel>;
  public updatedEmployee$:Observable<employeeModel>;

  private filterForm:Subject<employeeModel[] | undefined>;
  public filterForm$:Observable<employeeModel[] | undefined>;

  public pastedData:any;

  constructor(
    private overlay:Overlay,
    private cdr:ChangeDetectorRef
    ) { 
    this.employeesData = new Subject();
    this.employeesData$ = new Observable();
    this.employeesData$ = this.employeesData.asObservable();

    this.updatedEmployee = new Subject();
    this.updatedEmployee$ = new Observable();
    this.updatedEmployee$ = this.updatedEmployee.asObservable();

    this.filterForm = new Subject();
    this.filterForm$ = new Observable();
    this.filterForm$ = this.filterForm.asObservable();
  }

  /**
   * @name openFormOverlay
   * @param data
   * @description this will create an overlay
   */
  public openFormOverlay(data?:employeeModel){
    const overlayRef = this.overlay.create({
      hasBackdrop:true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    })

    const component = new ComponentPortal(EmployeeFormPresentationComponent)
    const componentRef = overlayRef.attach(component)

    overlayRef.backdropClick().subscribe(() => overlayRef.detach())
    
    componentRef.instance.emitFormData.subscribe((data:employeeModel) => {
      overlayRef.detach()
      this.employeesData.next(data);
    })

    componentRef.instance.emitUpdateData.subscribe((data:employeeModel) => {
      overlayRef.detach()
      this.updatedEmployee.next(data);
    })

    if(data)
      componentRef.instance.editEmployee = data;
  }

  /**
   * @name openFilterOverlay
   * @param data
   * @description this will create an overlay
   */  
  public openFilterOverlay(employeesData?:employeeModel[]){
    const overlayRef = this.overlay.create({
      hasBackdrop:true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    })

    const component = new ComponentPortal(EmployeeFilterPresentationComponent)
    const componentRef = overlayRef.attach(component)

    overlayRef.backdropClick().subscribe(() => overlayRef.detach());

    componentRef.instance.emitFilterForm.subscribe((data:any) => {
      overlayRef.detach();
      this.pastedData = data
      let filterdata = employeesData?.filter((item:employeeModel) => item.gender === data.gender)
      this.filterForm.next(filterdata)
    })

    if(this.pastedData)
      componentRef.instance.pastedData = this.pastedData;
  }
}
