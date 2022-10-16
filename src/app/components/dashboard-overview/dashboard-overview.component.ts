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
  private _countStatus:Subscription = new Subscription()


  constructor(
    private _dashboardService:DashboardService
  ) {
    this.getAllMemberCount()
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._countStatus.unsubscribe()
  }

  getAllMemberCount(){
    this._countStatus = this._dashboardService.getCountOfMemberStatus().subscribe((res)=>{
      this.countMemberStatus = res
    },(err)=>{
      console.log(err)
    })
  }

  

}
