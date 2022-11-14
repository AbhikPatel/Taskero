import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskContainerComponent } from './task-container/task-container.component';
import { TaskComponent } from './task.component';

const routes: Routes = [{ path: '', component: TaskContainerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
