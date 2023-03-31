import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  files:number = 0
  users:number = 0
  projects:number = 0
  pie:any = []
  routesChange:string = 'users'
  private overAllDetails:Subscription = new Subscription()
  constructor(
    public toastr:ToastrService,
    private router:Router,
    private _adminService:AdminService
  ) { 
   
  }

  ngOnInit(): void {
    this.getCountDetails()
  }


  getCountDetails(){
    this._adminService.countDetails().subscribe((res)=>{
      this.users = res.users
      this.files = res.files
      let it = 0
      let me = 0
      let ce = 0
      this.projects = res.projects.length
      res.projects.forEach((data:any) => {
        if(data.projectCategory == "IT") it+=1
        else if (data.projectCategory == "ME") me+=1
        else ce+=1
      });
      this.pie = [it,me,ce]
    })
  }

  logout(){
    this.toastr.success("Logout successfully")
    localStorage.removeItem("token")
    this.router.navigate(['/admin'])
  }

  changeRoutes(routing:any){
    this.routesChange = routing
  }


  ngOnDestroy(){
    this.overAllDetails.unsubscribe()
  }

  

  
}
