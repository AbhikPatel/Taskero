import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TaskFormPresenterService } from '../task-form-presenter/task-form-presenter.service';

@Component({
  selector: 'app-task-form-presentation',
  templateUrl: './task-form-presentation.component.html',
  viewProviders:[TaskFormPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskFormPresentationComponent implements OnInit {

  constructor(private service:TaskFormPresenterService) { }

  ngOnInit(): void {
  }

}
