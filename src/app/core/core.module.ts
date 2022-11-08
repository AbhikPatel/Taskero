import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { MasterComponent } from './master/master.component';
import { SidebarComponent } from './master/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { OAuthModule } from 'angular-oauth2-oidc';



@NgModule({
  declarations: [
    MasterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  exports:[
    MasterComponent
  ]
})
export class CoreModule { }
