import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/service/users.service';
import { environment } from 'src/environments/environment';
import { EventEmitterService } from 'src/app/service/event-emitter.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  notifications:any = []
  name:string = 'Pending...'
  img:string = environment.default_profile
  numberOfNotification:number = 0
  isShowMenuBar:boolean = false
  isNotificationOpen:boolean = false
  roles:any = 'USER'
  private _getAllNotificationSubscription:Subscription = new Subscription()
  private _seenAllNotificationSubscription:Subscription = new Subscription()
  private _getUserDetailsSubscription:Subscription = new Subscription()
  constructor(
    private _toastr:ToastrService,
    public router:Router,
    private _notificationService:NotificationService,
    private usersService:UsersService,
    private _eventEmitterService:EventEmitterService,
  ) {
    let temp= localStorage.getItem('roles')
    this.roles = temp == 'USER' ? 'users' : 'dashboard'
    this.getAllNotification()
    this.getUserDetails()
    _eventEmitterService.isAdminProfileChange$.subscribe(()=>{
      this.getUserDetails()
    })
   }

  ngOnInit(): void {

  }

  getUserDetails(){
    this._getUserDetailsSubscription = this.usersService.getUserDetails().subscribe((res)=>{
      if(res.image){
        this.img = res.image
      }
      this.name = res.fullName
    })
  }

  getAllNotification(){
    this._getAllNotificationSubscription = this._notificationService.getAllNotification()
    .subscribe((res)=>{
      this.notifications = res
      let count = 0
      res.forEach((data:any)=>{
        if(data.isSeen == false){
          count++;
        }
      })
      this.numberOfNotification = count
    })
  }

  openNotification(){
    this.isNotificationOpen = !this.isNotificationOpen
    this.isShowMenuBar = false
    this._seenAllNotificationSubscription = this._notificationService.seenAllNotification().subscribe()
    if(this.isNotificationOpen == false) this.getAllNotification()
  }

  showMenuBar(){
    this.isShowMenuBar = !this.isShowMenuBar
    this.isNotificationOpen = false
  }

  logout(){
    this._toastr.success("Logout successfully")
    localStorage.removeItem("token")
    this.router.navigate(['/'])
  }

  ngOnDestroy() {
    this._getAllNotificationSubscription.unsubscribe()
    this._seenAllNotificationSubscription.unsubscribe()
    this._getUserDetailsSubscription.unsubscribe()
  }

}
