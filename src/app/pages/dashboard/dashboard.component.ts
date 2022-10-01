import { Component, ComponentRef, OnInit   } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthUser } from 'src/app/service/auth-user.service';
import { AccountComponent } from 'src/app/components/account/account.component';
import { SocketService } from 'src/app/service/socket.service';
import { FriendsService } from 'src/app/service/friends.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/env';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAsideOpen:boolean = false
  path:string = environment.default_profile
  email:string = 'example@gmail.com'
  name:string="Luffy"
  listOfFriend = []
  isListOfFriend: Subscription = new Subscription()
  isGetUser: Subscription = new Subscription()

  constructor(
    private toastr:ToastrService,
    private getUser:AuthUser,
    private router:Router,
    private socket:SocketService,
    private friend:FriendsService
  ){
    this.getUserData()
    this.getListOfFriend()
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    this.isListOfFriend.unsubscribe()
    this.isGetUser.unsubscribe()
  }

  OpeningAside(){
    this.isAsideOpen = !this.isAsideOpen
  }

  //get current user info
  getUserData(){
    this.isGetUser = this.getUser.getCurrentUser()
    .subscribe((res)=>{      
      this.name = res.full_name ? res.full_name : res.email 
      this.email = res.email
      this.path = res.path ? res.path : this.path
      this.socket.join('currentUserBecomeOnline',res.email)
    },
      (err)=>{
      if(err.status == 0){
        this.toastr.error("SERVER ERROR")
      }else if(err.status == 401){
        localStorage.removeItem('token')
        this.router.navigate(['/']) //redirect any activities of user if the credential is not valid 
        this.toastr.warning(err.error.detail)
      }else{
        this.toastr.warning("An Error Ocurred!")
      }
    })
  }

  getListOfFriend(){
    this.isListOfFriend = this.friend.getAllFriend().subscribe((res)=>{
      this.listOfFriend = res
    })
  }


  subscribeToEmitter(componentRef:ComponentRef<any>){
    if(!(componentRef instanceof AccountComponent)){
      return
    }

    //change everything when child component or update profile is success
    const child: AccountComponent = componentRef;
    child.updateInfo.subscribe(()=>{
      this.getUserData()
    })

  }

  
  unsubscribe(componentRef:ComponentRef<any>){
    if(!(componentRef instanceof AccountComponent)){
      return
    }
    const child: AccountComponent = componentRef;
    child.updateInfo.unsubscribe()
    
  }


}
