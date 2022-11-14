import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements OnInit {
  countMemberStatus:any = {
    'joined':0,
    'joining':0
  }
  projectDone:number = 0
  managerCount:number = 0
  projectDetails:any =[]
  hasProject:boolean = false
  private _countStatus:Subscription = new Subscription()
  private _countManager:Subscription = new Subscription()
  private _projectDetails:Subscription = new Subscription()


  constructor(
    private _dashboardService:DashboardService
  ) {
    this.getAllMemberCount()
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._countStatus.unsubscribe()
    this._countManager.unsubscribe()
    this._projectDetails.unsubscribe()
  }

  getAllMemberCount(){
    this._countStatus = this._dashboardService.getCountOfMemberStatus().subscribe((res)=>{
      this.countMemberStatus = res
    },(err)=>{
      console.log(err)
    })
    this._countManager = this._dashboardService.getCountOfProjectManager().subscribe((res)=>{
      this.managerCount = res.managerCount
    })
    this._projectDetails = this._dashboardService.getAllProject().subscribe((res)=>{
      this.projectDetails=res
      this.projectDetails.forEach((data:any)=>{
        if (data.numberOfTask == data.numberOfTaskDone){
          this.projectDone+=1
        }
      })
      this.hasProject = true
    })
  }

  

}
