import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TaskContainerComponent } from './task-container/task-container.component';
import { TaskFormPresentationComponent } from './task-container/task-form-presentation/task-form-presentation.component';
import { TaskViewPresentationComponent } from './task-container/task-view-presentation/task-view-presentation.component';
import { TaskRoutingModule } from './task-routing.module';


@NgModule({
  declarations: [
    TaskContainerComponent,
    TaskViewPresentationComponent,
    TaskFormPresentationComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    HttpClientModule,
    OverlayModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class TaskModule { }
