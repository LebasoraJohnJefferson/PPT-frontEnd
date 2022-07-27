import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService:DashboardService) {
    this.dashboardService.getCurrentUser()
      .subscribe((res)=>{
        console.log(res)
      },
      (err)=>{
        console.log(err)
      })
  }

  ngOnInit(): void {
  }

}
