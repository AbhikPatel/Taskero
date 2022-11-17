import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { employeeModel } from '../../employee.model';
import { EmployeeListPresenterService } from '../employee-list-presenter/employee-list-presenter.service';

@Component({
  selector: 'app-employee-list-presentation',
  templateUrl: './employee-list-presentation.component.html',
  viewProviders: [EmployeeListPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListPresentationComponent implements OnInit {

  @Input() public set employeesData(v: employeeModel[] | null) {
    if (v){
      this._employeesData = v;
      this.newData = v
    }
    
  }
  public get employeesData(): employeeModel[] {
    return this._employeesData;
  }


  @Output() public emitEmployeesData: EventEmitter<employeeModel>
  @Output() public emitId: EventEmitter<number>
  @Output() public emitUpdateEmployee: EventEmitter<employeeModel>

  private _employeesData !: employeeModel[];
  public editId!: number;
  public searchText: string;
  public filterData!:employeeModel[];
  public dot:boolean;
  public newData:employeeModel[];

  constructor(
    private service: EmployeeListPresenterService,
    private cdr:ChangeDetectorRef
    ) {
    this.emitEmployeesData = new EventEmitter();
    this.emitId = new EventEmitter();
    this.emitUpdateEmployee = new EventEmitter();

    this.searchText = '';
    this.newData = [];
    this.dot = false;
  }
  
  ngOnInit(): void {
    this.prop();
  }
  
  /**
   * @name prop
   * @description This method is called in ngOnInit
   */
  public prop() {
    this.service.employeesData$.subscribe((data: employeeModel) => this.emitEmployeesData.emit(data))

    this.service.updatedEmployee$.subscribe((data: employeeModel) => {
      let edit = { id: this.editId }
      Object.assign(data, edit);
      this.emitUpdateEmployee.emit(data)
    })

    this.service.filterForm$.subscribe((data:any) => {
      this.employeesData = data
      this.cdr.markForCheck();
      this.dot = true;

      if(data.length === 0){
        this.dot = false
      }
    })
  }

  /**
   * @name onAdd
   * @description on click it will open form overlay
   */
  public onAdd() {
    this.service.openFormOverlay();
  }

  /**
   * @name onDelete
   * @param id 
   * @description it emits the id for deletion of the employee
   */
  public onDelete(id: number) {
    this.emitId.emit(id)
  }

  /**
   * @name onEdit
   * @param id 
   * @description emits the id for edit
   */
  public onEdit(id: number) {
    this.editId = id;
    const data = this.employeesData.find((item: employeeModel) => item.id === id)
    this.service.openFormOverlay(data);
  }

  /**
   * @name onFilter
   * @description on click on filter
   */
  public onFilter() {
    this.service.openFilterOverlay(this.employeesData);
  }
}
