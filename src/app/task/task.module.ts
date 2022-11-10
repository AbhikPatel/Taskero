import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { TaskContainerComponent } from './task-container/task-container.component';
import { TaskViewPresentationComponent } from './task-container/task-view-presentation/task-view-presentation.component';
import { TaskFormPresentationComponent } from './task-container/task-form-presentation/task-form-presentation.component';


@NgModule({
  declarations: [
    TaskComponent,
    TaskContainerComponent,
    TaskViewPresentationComponent,
    TaskFormPresentationComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
