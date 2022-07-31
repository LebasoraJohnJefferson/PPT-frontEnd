import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  email:String = ''
  @Input() content:String = "Contributors"
  constructor(
    private toastr:ToastrService,
    private dashboardService:DashboardService
  ) {
    this.dashboardService.getCurrentUser()
    .subscribe((res)=>{
      this.email = res.email
    },
    (err)=>{
      let message = ''
      if(err.error.details == "user does not exist"){
        localStorage.removeItem('token')
        message = err.error.detail
      }else{
        message = "An Error Ocurred!"
      }
      this.toastr.warning(message)
    })
  }

  ngOnInit(): void {
  }

}
