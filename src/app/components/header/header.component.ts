import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GetUser } from 'src/app/service/header.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() email:String =''
  isOptionOpen:boolean = false
  constructor(
    private router:Router,
    private toastr:ToastrService,
    private getUser:GetUser,
  ) { 

    this.getUser.getCurrentUser()
  .subscribe((res)=>{      
      this.email = res.full_name ? res.full_name : res.email 
  },
  (err)=>{
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

  ToggleOptions(){
    this.isOptionOpen = !this.isOptionOpen
  }

  
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/'])
    this.toastr.success("Logout Successfully")
  }
  
}
