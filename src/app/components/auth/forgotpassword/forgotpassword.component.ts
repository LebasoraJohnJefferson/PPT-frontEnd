import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthUser } from 'src/app/service/auth-user.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  isSubmitting:boolean = false

  forgotpasswordForm:FormGroup = this._formBuilder.group({
    email:['',[Validators.required,Validators.email]]
  })

  constructor(
    private _router:Router,
    private _formBuilder:FormBuilder,
    public toast:ToastrService,
    private _authService:AuthUser
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    this._router.navigate(['/'])
  }

  submitResetRequest(){
    if(this.forgotpasswordForm.invalid){
      this.toast.warning("Invalid Email")
      return
    }
    this.isSubmitting = true
    this._authService.forgotPassword(this.forgotpasswordForm.value).subscribe({
      next:()=>{
        this.isSubmitting = false
        this.forgotpasswordForm.reset()
        this.toast.success("Request granted, Check your email to verify!")
      },error:(err)=>{
        this.isSubmitting = false
        this.forgotpasswordForm.reset()
        let message = err?.error?.detail[0]?.msg ? err?.error?.detail[0]?.msg : err?.error?.detail
        this.toast.warning(message)
      }
    })
    
  }

}
