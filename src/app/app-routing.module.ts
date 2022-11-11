import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path:'', redirectTo:'employee', pathMatch:'full'},
  { path: 'employee', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
