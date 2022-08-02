import { Component, OnInit ,ViewChild  } from '@angular/core';
import { DashboardService } from 'src/app/service/dashboard.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  content:String = 'Friends'
  fakeArray = new Array(10)
  email:string = ''
 


  constructor(
    private dashboardService:DashboardService,
    private router:Router,
    private toastr:ToastrService
  ){


    this.dashboardService.getCurrentUser()
      .subscribe((res)=>{      
          this.email = res.full_name ? res.full_name : res.email 
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
