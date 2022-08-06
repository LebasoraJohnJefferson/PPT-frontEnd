import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthUser } from 'src/app/service/auth-user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  updateUserForm = this.fb.group({
    email:[null,[Validators.required,Validators.email]],
    password:[null,Validators.required],
    confirmPassword:[null,Validators.required],
    full_name:[null,Validators.required],
    address:[null,Validators.required]

  })

  constructor(
    private fb:FormBuilder,
    private authUser:AuthUser,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
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
          else if (err.status == 409) this.toastr.warning(err.error.detail)
          else this.toastr.error('Unknown Error')
        })
        this.updateUserForm.reset()
    }
  }


}