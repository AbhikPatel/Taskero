import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { cardModule, Steps, taskModule } from '../../task.model';
import { TaskFormPresentationComponent } from '../task-form-presentation/task-form-presentation.component';
import { TaskProgressPresentationComponent } from '../task-progress-presentation/task-progress-presentation.component';

@Injectable()
export class TaskViewPresenterService {

  private FormData: Subject<taskModule>;
  public FormData$: Observable<taskModule>;

  private updatedData: Subject<taskModule>;
  public updatedData$: Observable<taskModule>;

  constructor(private overlay: Overlay) {
    this.FormData = new Subject();
    this.FormData$ = new Observable();
    this.FormData$ = this.FormData.asObservable();

    this.updatedData = new Subject();
    this.updatedData$ = new Observable();
    this.updatedData$ = this.updatedData.asObservable();
  }

  /**
   * @name openFormOverlay
   * @param employees 
   * @param taskData 
   * @param editData
   */
  public openFormOverlay(employees?: any, taskData?: any, editData?: any) {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    })

    const component = new ComponentPortal(TaskFormPresentationComponent)
    const componentRef = overlayRef.attach(component)

    overlayRef.backdropClick().subscribe(() => overlayRef.detach());

    componentRef.instance.Employees = employees

    componentRef.instance.emitFormData.subscribe((data) => {
      if (editData) {
        let cardId = taskData[editData.status].taskCard.map((item: any) => item.taskName).indexOf(data.taskName)
        taskData[editData.status].taskCard.splice(cardId, 1)

        if (editData.status != data.status)
          this.updatedData.next(taskData[editData.status])

        taskData[data.status].taskCard.push(data)
        let finalData = taskData[data.status]

        this.FormData.next(finalData)
      } else {
        taskData[data.status].taskCard.push(data)
        let finalData = taskData[data.status]
        this.FormData.next(finalData)
      }
      overlayRef.detach();
    })

    if (editData)
      componentRef.instance.editData = editData
  }

  public openProgressOverlay(steps: any, cardData?: any, taskData?: any) {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    })

    const component = new ComponentPortal(TaskProgressPresentationComponent)
    const componentRef = overlayRef.attach(component)

    componentRef.instance.steps = steps

    componentRef.instance.emitStepsData.subscribe((data: Steps[]) => {
      cardData.steps = data
      let complete = data.every((item: any) => item.stepStatus === '1')
      let cardId = taskData[cardData.status].taskCard.map((items: any) => items.taskName).indexOf(cardData.taskName)

      if (complete === true) {
        taskData[cardData.status].taskCard.splice(cardId, 1)
        this.updatedData.next(taskData[cardData.status])

        cardData.status = 2;
        taskData[2].taskCard.push(cardData)
        this.FormData.next(taskData[2])

      } else {

        if (cardData.status === 2) {
          taskData[2].taskCard.splice(cardId, 1)
          this.updatedData.next(taskData[2])
          cardData.status = 1
          taskData[1].taskCard.push(cardData)
        }

        this.FormData.next(taskData[cardData.status])
      }

      overlayRef.detach()
    })
  }
}
