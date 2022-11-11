import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeeListContainerComponent } from './employee-list-container/employee-list-container.component';
import { EmployeeListPresentationComponent } from './employee-list-container/employee-list-presentation/employee-list-presentation.component';
import { EmployeeFormPresentationComponent } from './employee-list-container/employee-form-presentation/employee-form-presentation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { FilterPipe } from './filter.pipe';
import { EmployeeFilterPresentationComponent } from './employee-list-container/employee-filter-presentation/employee-filter-presentation.component';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeListContainerComponent,
    EmployeeListPresentationComponent,
    EmployeeFormPresentationComponent,
    FilterPipe,
    EmployeeFilterPresentationComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    ReactiveFormsModule,
    OverlayModule,
    HttpClientModule,
    FormsModule
  ],
  providers:[
    EmployeeService
  ]
})
export class EmployeesModule { }
