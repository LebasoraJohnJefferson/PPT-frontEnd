import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { Subscription } from 'rxjs';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  currentRoute:any;
  files:number = 0
  users:number = 0
  projects:number = 0
  pie:any = []
  isPieDateReady:boolean = false
  private overAllDetails:Subscription = new Subscription()
  constructor(
    public toastr:ToastrService,
    private _router:Router,
    private _adminService:AdminService,
    private _eventEmitterService:EventEmitterService,
    public route:ActivatedRoute
  ) { 
    _eventEmitterService.getAllDetailsInAdmin$.subscribe(()=>{
      this.getCountDetails()
    })
  }

  ngOnInit(): void {
    let roles = localStorage.getItem('roles')
    if(roles == 'USER'){
      this._router.navigate(['/users'])
      this.toastr.warning('Illegal Action!')
    }else if (roles == 'MANAGER'){
      this._router.navigate(['/dashboard'])
      this.toastr.warning('Illegal Action!')
    }
    this.currentRoute = this.route.snapshot.children[0].routeConfig?.path
    this.getCountDetails()
  }

  getCurrentRouteURL(currentRoute:any) {
    this.currentRoute = currentRoute
  }

  

  getCountDetails(){
    this.isPieDateReady = false
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
      this.pie = it!=0 || me!=0 || ce!=0 ? [it,me,ce] : []
      this.isPieDateReady=true
    },(()=>{
      this.isPieDateReady=true
    }))
  }

  logout(){
    this.toastr.success("Logout successfully")
    localStorage.removeItem("token")
    this._router.navigate(['/admin'])
  }



  ngOnDestroy(){
    this.overAllDetails.unsubscribe()
  }


}
