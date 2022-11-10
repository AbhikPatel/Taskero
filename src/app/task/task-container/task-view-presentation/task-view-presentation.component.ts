import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaskViewPresenterService } from '../task-view-presenter/task-view-presenter.service';

@Component({
  selector: 'app-task-view-presentation',
  templateUrl: './task-view-presentation.component.html',
  viewProviders:[TaskViewPresenterService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class TaskViewPresentationComponent implements OnInit {

  constructor(private service: TaskViewPresenterService) { }

  ngOnInit(): void {
  }

}
