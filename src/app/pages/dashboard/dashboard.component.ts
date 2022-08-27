import { Component, ComponentRef, OnInit   } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthUser } from 'src/app/service/auth-user.service';
import { AccountComponent } from 'src/app/components/account/account.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAsideOpen:boolean = false
  path:string = "./assets/images/profile_thumb.png" 
  email:string = 'example@gmail.com'
  
 
  constructor(
    private toastr:ToastrService,
    private getUser:AuthUser,
    private router:Router
  ){
    this.getUserData()
  }

  ngOnInit(): void {
    
  }

  OpeningAside(){
    this.isAsideOpen = !this.isAsideOpen
  }

  getUserData(){
    this.getUser.getCurrentUser()
    .subscribe((res)=>{      
      this.email = res.full_name ? res.full_name : res.email 
      this.path = res.path ? res.path : this.path
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

  subscribeToEmitter(componentRef:ComponentRef<any>){
    if(!(componentRef instanceof AccountComponent)){
      return
    }
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
