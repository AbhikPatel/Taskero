import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { employeeModel } from 'src/app/employees/employee.model';
import { cardModule, taskModule } from '../../task.model';
import { TaskViewPresenterService } from '../task-view-presenter/task-view-presenter.service';

@Component({
  selector: 'app-task-view-presentation',
  templateUrl: './task-view-presentation.component.html',
  viewProviders: [TaskViewPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskViewPresentationComponent implements OnInit {

  @Input() public set taskData(v: taskModule[] | null) {
    if (v)
      this._taskData = v;
  }
  public get taskData(): taskModule[] | null {
    return this._taskData;
  }

  @Input() public set employeeData(v: employeeModel[] | null) {
    if (v)
      this._employeeData = v;
  }
  public get employeeData(): employeeModel[] | null {
    return this._employeeData;
  }

  @Output() public emitData: EventEmitter<taskModule>

  
  public todaysDate: Date = new Date();
  public menu: string;
  public notification:boolean;
  
  public barColor: 'success' | 'info' | 'warning' | 'danger' = 'info';
  
  private _employeeData !: employeeModel[];
  private _taskData !: taskModule[];

  constructor(
    private service: TaskViewPresenterService,
    private sant:DomSanitizer,
    private cdr:ChangeDetectorRef
  ) {
    this.emitData = new EventEmitter();
    this.menu = ''
    this.notification = false
  }

  ngOnInit(): void {
    this.prop()
  }

  /**
   * @name prop
   * @description This method is called in ngOnInit
   */
  public prop() {
    this.service.FormData$.subscribe((data) => this.emitData.emit(data))
    
    this.service.updatedData$.subscribe((data) => this.emitData.emit(data))

    this.service.filteredData$.subscribe((data) => {
      if(data){
        this.notification = true
        this._taskData.map((items:taskModule) => items.taskCard = [])

        for(let i=0; i<data.length; i++)
          this._taskData[data[i].status].taskCard.push(data[i])

        this.cdr.markForCheck();
        console.log(data);
        
      }else
        this.notification = false
    })
  }

  /**
   * @name onCreate
   * @description this will create an overlay
   */
  public onCreate(data?: any) {
    this.service.openFormOverlay(this._employeeData, this._taskData, data);
    this.menu = ''
  }

  /**
   * @name completedTasks
   * @param data 
   * @returns length of completed task
   */
  public completedTasks(data: any) {
    let complete = data.filter((item: any) => item.stepStatus === '1')

    return complete.length
  }

  /**
   * @name progress
   * @param data 
   * @returns progress of all the steps
   */
  public progress(data: any) {
    let complete = data.filter((item: any) => item.stepStatus === '1')
    let total = data.length
    let progress = (complete.length * 100) / total

    if (progress < 26)
      this.barColor = 'danger'
    else if (progress > 26 && progress < 100)
      this.barColor = 'warning'
    else
      this.barColor = 'success'

    return Math.round(progress)
  }

  /**
   * @name dueDate
   * @param data 
   * @returns days remaining for the task
   */
  public dueDate(data: any) {

    let dueDate = new Date(data)
    var time = dueDate.getTime() - this.todaysDate.getTime()
    var deadline = time / (1000 * 3600 * 24)

    if(deadline > 0)
      return Math.ceil(deadline) + ' Days Remaining'
    else
      return 'Days OverDue: ' + Math.ceil(Math.abs(deadline) - 1)
  }

  /**
   * @name onCard
   * @param data 
   * @param card 
   * @param task 
   */
  public onCard(data: any, card: any) {
    this.service.openProgressOverlay(data, card, this._taskData)
    this.menu = ''
  }

  /**
   * @name onMenu
   * @param name 
   * @description for dialogue box
   */
  public onMenu(name: string) {
    this.menu ? this.menu = '' : this.menu = name
  }

  /**
   * @name onDelete
   * @param name 
   * @param id 
   * @description This method deletes card as per params
   */
  public onDelete(name: string, id:number) {
    let cardId = this._taskData[id].taskCard.findIndex((data:cardModule) => data.taskName === name)
    this._taskData[id].taskCard.splice(cardId, 1)
    this.emitData.emit(this._taskData[id])
  }

  /**
   * @name onFav
   * @param card
   * @description This method enables favorite icon 
   */
  public onFav(card:cardModule){
    card.favorite === true ? card.favorite = false : card.favorite = true

    this.emitData.emit(this._taskData[card.status])
    this.menu = ''
  }

  /**
   * @name getImage
   * @param data 
   * @returns images that is converted from base64
   */
  public getImage(data:any){
    let employees:any = this.employeeData?.filter((items:employeeModel) => items.name === data.name)
    
    return this.sant.bypassSecurityTrustResourceUrl(employees[0].profile)  
  }

  /**
   * @name getNames
   * @param data 
   * @returns names of the employees
   */
  public getNames(data:any){
    return data.map((items:any) => items.name)
  }

  public onFilter(){
    this.service.openFilterOverlay(this._taskData)
  }
}
