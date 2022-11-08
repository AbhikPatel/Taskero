import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeeListContainerComponent } from './employee-list-container/employee-list-container.component';
import { EmployeeListPresentationComponent } from './employee-list-container/employee-list-presentation/employee-list-presentation.component';
import { EmployeeFormPresentationComponent } from './employee-list-container/employee-form-presentation/employee-form-presentation.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeListContainerComponent,
    EmployeeListPresentationComponent,
    EmployeeFormPresentationComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule
  ]
})
export class EmployeesModule { }
