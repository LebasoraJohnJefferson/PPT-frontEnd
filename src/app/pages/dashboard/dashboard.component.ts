import { Component, OnInit   } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthUser } from 'src/app/service/auth-user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isAsideOpen:boolean = false
  email:string = ''
  
 
  constructor(
    private toastr:ToastrService,
    private getUser:AuthUser
  ){
    this.getUser.getCurrentUser()
  .subscribe((res)=>{      
      // this.email = res.full_name ? res.full_name : res.email 
      console.log(res)
  },
  (err)=>{
    console.log(err)
    if(err.status == 0){
      this.toastr.error("SERVER ERROR")
    }else if(err.status == 401){
      localStorage.removeItem('token')
      // this.router.navigate(['/']) //redirect any activities of user if the credential is not valid 
      this.toastr.warning(err.error.detail)
    }else{
      this.toastr.warning("An Error Ocurred!")
    }
  })
  }

  ngOnInit(): void {
  }

  OpeningAside(){
    this.isAsideOpen = !this.isAsideOpen
  }


}
