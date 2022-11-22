import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';
import { environment } from 'src/environments/environment';
import { EventEmitterService } from 'src/app/service/event-emitter.service';


@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  nav:string = '/dashboard/overview';
  hostingName = environment.baseURL
  defaultProfile = environment.default_profile
  name:string = 'Super Admin'

  private _getAdminDetailsSubscription:Subscription = new Subscription()

  constructor(
    private _eventEmitterService:EventEmitterService,
    private router:Router,
    public toastr:ToastrService,
    private _adminService:AdminService
  ) {
    this.getDetails()
    if(this.router.url == '/dashboard/overview' ||
      this.router.url == '/dashboard/projects' ||
      this.router.url == '/dashboard/timeline' ||
      this.router.url == '/dashboard/members' ||
      this.router.url == '/dashboard/managers' ||
      this.router.url == '/dashboard/reports' ||
      this.router.url == '/dashboard/notification' ||
      this.router.url == '/dashboard/admin'
    ){
      this.nav = this.router.url
    }
    _eventEmitterService.isAdminProfileChange$.subscribe(()=>{
      this.getDetails()
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._getAdminDetailsSubscription.unsubscribe()
  }

  AsideFocusPage(navigationName:string){
    this.nav = navigationName
  }

  logout(){
    this.toastr.success("Logout successfully")
    localStorage.removeItem("token")
    this.router.navigate(['/'])
  }

  getDetails(){
    this._getAdminDetailsSubscription = this._adminService.getAdminDetails().subscribe((res)=>{
      if(res.image){
        this.defaultProfile =  this.hostingName+'/users/profiles/'+res.image
      }
      if(res.fullName){
        this.name = res.fullName
      }
    })
  }

}
