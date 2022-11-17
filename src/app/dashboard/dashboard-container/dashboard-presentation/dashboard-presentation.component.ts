import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { taskModule } from 'src/app/task/task.model';
import { DashboardPresenterService } from '../dashboard-presenter/dashboard-presenter.service';

@Component({
  selector: 'app-dashboard-presentation',
  templateUrl: './dashboard-presentation.component.html',
  viewProviders:[DashboardPresenterService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DashboardPresentationComponent implements OnInit {

  
  @Input() public set taskData(v : taskModule[] | null) {
    if(v){
      this._taskData = v;
      this.getData(v)
    }
    
  }
  public get taskData() : taskModule[] | null {
    return this._taskData;
  }
  
  private _taskData !: taskModule[];

  constructor(
    private service:DashboardPresenterService
    ) { }

  ngOnInit(): void {
    this.prop()
  }

  /**
   * @name prop
   * @description This method is called in ngOnInit
   */
  public prop(){
    this.service.newTask$.subscribe((data:number) => this.report[2].count = data)

    this.service.favorite.subscribe((data:number) => this.report[3].count = data)
  }

  public getData(data:any){
    this.service.gettingData(data)
  }

  report:any[] = [
    {
      name:"Near Deadline",
      count:10
    },
    {
      name:"OverDue",
      count:10
    },
    {
      name:"New Tasks",
      count:10
    },
    {
      name:"Favorites",
      count:10
    },
  ]

}
