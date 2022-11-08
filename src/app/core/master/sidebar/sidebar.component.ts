import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  constructor() { }

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
}
