import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GetDataService } from 'src/app/shared/get-data.service';
import { taskModule } from 'src/app/task/task.model';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html'
})
export class DashboardContainerComponent implements OnInit {

  public getTaskData$:Observable<taskModule[]>;
  constructor(private sharedService:GetDataService) { 
    this.getTaskData$ = new Observable()
  }

  ngOnInit(): void {
    this.getTaskData$ = this.sharedService.getTasks()
  }

}
