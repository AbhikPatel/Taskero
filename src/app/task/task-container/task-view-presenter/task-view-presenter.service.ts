import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { cardModule, Steps, taskModule } from '../../task.model';
import { TaskFilterPresentationComponent } from '../task-filter-presentation/task-filter-presentation.component';
import { TaskFormPresentationComponent } from '../task-form-presentation/task-form-presentation.component';
import { TaskProgressPresentationComponent } from '../task-progress-presentation/task-progress-presentation.component';

@Injectable()
export class TaskViewPresenterService {

  private FormData: Subject<taskModule>;
  public FormData$: Observable<taskModule>;

  private updatedData: Subject<taskModule>;
  public updatedData$: Observable<taskModule>;

  private filteredData: Subject<any>;
  public filteredData$: Observable<any>;

  constructor(private overlay: Overlay) {
    this.FormData = new Subject();
    this.FormData$ = new Observable();
    this.FormData$ = this.FormData.asObservable();

    this.updatedData = new Subject();
    this.updatedData$ = new Observable();
    this.updatedData$ = this.updatedData.asObservable();

    this.filteredData = new Subject();
    this.filteredData$ = new Observable();
    this.filteredData$ = this.filteredData.asObservable();
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
        let obj = { favorite: false }
        let total = Object.assign(obj, data)
        taskData[data.status].taskCard.push(total)
        let finalData = taskData[data.status]
        this.FormData.next(finalData)
      }
      overlayRef.detach();
    })

    if (editData)
      componentRef.instance.editData = editData
  }

  /**
   * @name openProgressOverlay
   * @param steps 
   * @param cardData 
   * @param taskData 
   */
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

  public openFilterOverlay(task: taskModule[]) {
    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically()
    })

    const component = new ComponentPortal(TaskFilterPresentationComponent)
    const componentRef = overlayRef.attach(component)

    overlayRef.backdropClick().subscribe(() => overlayRef.detach())

    componentRef.instance.emitFilterForm.subscribe((data) => {
      console.log(data);

      let Keys = Object.keys(data)
      let filterData: any = []

      Keys.forEach((items: any) => {
        if (data[items]) {
          filterData = task.map((taskData: taskModule) => taskData.taskCard.filter((card: any) => card[items] === data[items]))
          task[0].taskCard = filterData.flat()
        }
      })

      this.filteredData.next(filterData.flat())
      overlayRef.detach();
    })
  }
}
