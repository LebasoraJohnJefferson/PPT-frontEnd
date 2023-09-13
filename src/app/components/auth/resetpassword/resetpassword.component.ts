import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthUser } from 'src/app/service/auth-user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  isSubmitting:boolean = false
  token:any;

  resetpasswordForm:FormGroup = this._formBuilder.group({
    password:['',[Validators.required]],
    confirm_password:['',[Validators.required]]
  })

  constructor(
    private _router:Router,
    private _formBuilder:FormBuilder,
    private _routes:ActivatedRoute,
    public toast:ToastrService,
    private authService:AuthUser
  ) { }

  ngOnInit(): void {
    this.token = this._routes.snapshot.paramMap.get('token')
  }

  goBack(){
    this._router.navigate(['/'])
  }

  submitResetRequest(){
    if(this.resetpasswordForm.invalid) {
      this.toast.warning("Empty Input")
      return
    }
    this.isSubmitting = true
    this.authService.resetPassword(this.token,this.resetpasswordForm.value).subscribe({
      next:()=>{
        localStorage.removeItem('token')
        this.toast.success("Password changed successfully")
        this.resetpasswordForm.reset()
        this._router.navigate(['/'])
        this.isSubmitting = false
      },error:(err)=>{
        localStorage.removeItem('token')
        this.isSubmitting = false
        let message = err?.error?.detail[0]?.msg ? err?.error?.detail[0]?.msg : err?.error?.detail
        this.toast.warning(message)
        this.resetpasswordForm.reset()
      }
    })
  }

}
