import { Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/shared/get-data.service';
import { cardModule, taskModule } from 'src/app/task/task.model';
import { OauthService } from '../../oauth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  public user:any;
  public avatar:string;

  constructor(
    private oAuthService:OauthService, 
    private service: GetDataService
    ) { 
    oAuthService.userProfile.subscribe((userInfo) => this.user = userInfo);
    this.avatar = '';
    
    if(!this.user?.info?.profile)
      this.avatar = '../../../../assets/images/avatar.jpg'
    else
      this.avatar = this.user?.info?.profile
  }

  ngOnInit(): void {
    this.prop()
  }

  ngOnChanges(){
    this.prop();
  }

  /**
   * @name prop
   * @description This method is called in ngOnInit
   */
  public prop(){
    this.service.getTasks().subscribe((data:taskModule[]) => {
      let highPriority =  data.map((item:taskModule) => item.taskCard.filter((task:cardModule) => task.priority === 3))
      this.priority[0].count = highPriority.flat().length
      
      let mediumPriority =  data.map((item:taskModule) => item.taskCard.filter((task:cardModule) => task.priority === 2))
      this.priority[1].count = mediumPriority.flat().length

      let lowPriority =  data.map((item:taskModule) => item.taskCard.filter((task:cardModule) => task.priority === 1))
      this.priority[2].count = lowPriority.flat().length
    })
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
      count:0
    },
    {
      classname:"text-warning",
      text:"Medium",
      count:0
    },
    {
      classname:"text-success",
      text:"Low",
      count:0
    },
  ]

  /**
   * @name onLogout
   * @description calls the singout methos from the service
   */
  public onLogout(){
    this.oAuthService.signOut();
  }
}
