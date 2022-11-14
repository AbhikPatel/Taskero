import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TaskContainerComponent } from './task-container/task-container.component';
import { TaskFormPresentationComponent } from './task-container/task-form-presentation/task-form-presentation.component';
import { TaskViewPresentationComponent } from './task-container/task-view-presentation/task-view-presentation.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskService } from './task.service';
import { TaskProgressPresentationComponent } from './task-container/task-progress-presentation/task-progress-presentation.component';


@NgModule({
  declarations: [
    TaskContainerComponent,
    TaskViewPresentationComponent,
    TaskFormPresentationComponent,
    TaskProgressPresentationComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    HttpClientModule,
    OverlayModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    ProgressbarModule
  ],
  providers:[
    TaskService,
    DatePipe
  ]
})
export class TaskModule { }
