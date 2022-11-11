import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { employeeModel } from 'src/app/employees/employee.model';
import { TaskFormPresentationComponent } from '../task-form-presentation/task-form-presentation.component';

@Injectable()
export class TaskViewPresenterService {

  constructor(private overlay:Overlay) { }

  public openFormOverlay(employees?:any){
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    })

    const component = new ComponentPortal(TaskFormPresentationComponent)
    const componentRef = overlayRef.attach(component)

    overlayRef.backdropClick().subscribe(() => overlayRef.detach());

    componentRef.instance.Employees = employees
  }
}
