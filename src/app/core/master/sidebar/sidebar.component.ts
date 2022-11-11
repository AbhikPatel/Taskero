import { Component, OnInit } from '@angular/core';
import { OauthService } from '../../oauth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  public user:any;

  constructor(private oAuthService:OauthService) { 
    oAuthService.userProfile.subscribe((userInfo) => this.user = userInfo)
  }

  ngOnInit(): void {
  }

  navLink = [
    {
      classname:"bxs-dashboard",
      text:"Dashboard",
      route:"dashboard"
    },
    {
      classname:"bx-clipboard",
      text:"Tasks",
      route:"task"
    },
    {
      classname:"bx-user",
      text:"Employees",
      route:"employee"
    },
  ]

  priority = [
    {
      classname:"text-danger",
      text:"High",
      count:10
    },
    {
      classname:"text-warning",
      text:"Medium",
      count:25
    },
    {
      classname:"text-success",
      text:"Low",
      count:9
    },
  ]

  public onLogout(){
    this.oAuthService.signOut();
  }
}
