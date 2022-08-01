import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthUser } from 'src/app/service/auth-user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() email:String =''
  isOptionOpen:boolean = false
  isAccountOpen:boolean = false
  constructor(
    private router:Router,
    private toastr:ToastrService,
    private fb:FormBuilder,
    private authUser:AuthUser
  ) { }


  updateUserForm = this.fb.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,Validators.required],
    confirmPassword:[null,Validators.required],
    full_name:[null,Validators.required],
    address:[null,Validators.required]

  })

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

  OpenAccountForm(){
    this.isAccountOpen = !this.isAccountOpen
  }

  onSubmit(){
    if(this.updateUserForm.valid){
      this.authUser.UpdateUser(this.updateUserForm.value).subscribe(
        (res)=>{
            this.toastr.success("Successfully Updated!")
        },
        (err)=>{
          if(err.status == 0) this.toastr.error('SERVER ERROR')
          else if (err.status == 401) this.toastr.warning(err.error.detail)
          else this.toastr.error('Unknown Error')
        })
        this.updateUserForm.reset()
    }
  }

}
