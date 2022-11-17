import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetDataService } from 'src/app/shared/get-data.service';
import { OauthService } from '../../oauth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  public user:any;

  constructor(
    private oAuthService:OauthService, 
    private service: GetDataService,
    private cdr:ChangeDetectorRef
    ) { 
    oAuthService.userProfile.subscribe((userInfo) => this.user = userInfo)
  }

  ngOnInit(): void {
    this.prop()
  }

  /**
   * @name prop
   * @description This method is called in ngOnInit
   */
  public prop(){
    this.service.getTasks().subscribe((data:any) => {
      this.cdr.markForCheck();
      let highPriority =  data.map((item:any) => item.taskCard.filter((task:any) => task.priority === 3))
      this.priority[0].count = highPriority.flat().length
      
      let mediumPriority =  data.map((item:any) => item.taskCard.filter((task:any) => task.priority === 2))
      this.priority[1].count = mediumPriority.flat().length

      let lowPriority =  data.map((item:any) => item.taskCard.filter((task:any) => task.priority === 1))
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

  public onLogout(){
    this.oAuthService.signOut();
  }
}
