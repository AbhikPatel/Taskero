import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { employeeModel } from 'src/app/employees/employee.model';
import { cardModule, taskModule } from '../../task.model';
import { TaskFormPresentationComponent } from '../task-form-presentation/task-form-presentation.component';
import { TaskProgressPresentationComponent } from '../task-progress-presentation/task-progress-presentation.component';

@Injectable()
export class TaskViewPresenterService {

  private FormData:Subject<taskModule>;
  public FormData$:Observable<taskModule>;

  constructor(private overlay:Overlay) { 
    this.FormData = new Subject();
    this.FormData$ = new Observable();
    this.FormData$ = this.FormData.asObservable();
  }

  /**
   * @name openFormOverlay
   * @param employees 
   * @param taskData 
   */
  public openFormOverlay(employees?:any, taskData?:any){
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    })

    const component = new ComponentPortal(TaskFormPresentationComponent)
    const componentRef = overlayRef.attach(component)

    overlayRef.backdropClick().subscribe(() => overlayRef.detach());

    componentRef.instance.Employees = employees

    componentRef.instance.emitFormData.subscribe((data) => {
      taskData[data.status].taskCard.push(data)
      let finalData = taskData[data.status]
      this.FormData.next(finalData)
      overlayRef.detach();
    })
  }

  public openProgressOverlay(steps:any){
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    })

    const component = new ComponentPortal(TaskProgressPresentationComponent)
    const componentRef = overlayRef.attach(component)

    overlayRef.backdropClick().subscribe(() => overlayRef.detach());

    componentRef.instance.steps = steps
  }
}
