import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthUser } from 'src/app/service/auth-user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isRegisterFormOpen:boolean = false
  isShowPassword:boolean = false
  isLoginButton:boolean = false
  isRegisterButton:boolean = false
  private _registerSubscription:Subscription = new Subscription()
  private _loginSubscription:Subscription = new Subscription()

  loginFormGroup: FormGroup = this._formBuilder.group({
    username: ['',[Validators.required,Validators.email]],
    password:['',[Validators.required]]
  })

  firstFormGroup: FormGroup = this._formBuilder.group({
    email: ['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    password2:['',[Validators.required]]
  });

  secondFormGroup: FormGroup = this._formBuilder.group({
    fullName: ['',[Validators.required]],
    address:['',[Validators.required]],
    birthDay:['',[Validators.required]],
    gender:['',[Validators.required]]
  });


  constructor(
    private _formBuilder: FormBuilder,
    public toastr:ToastrService,
    private _authService:AuthUser,
    private router:Router
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._registerSubscription.unsubscribe()
    this._loginSubscription.unsubscribe()
  }

  showPassword(){
    this.isShowPassword = !this.isShowPassword
  }

  
  switchToRegister(){
    this.isRegisterFormOpen = !this.isRegisterFormOpen
  }

  SubmitLogin(){
    if(this.loginFormGroup.valid){
      this.isLoginButton =true
      this._loginSubscription = this._authService.LoginUser(this.loginFormGroup.value).subscribe((res)=>{
        this.toastr.success("Successfully Login")
        localStorage.setItem('token',res.access_token)
        this.router.navigate(['/dashboard/overview'])
        this.isLoginButton =false
        this.loginFormGroup.reset()
      },(err)=>{
        this.toastr.warning(err.error.detail)
        this.isLoginButton =false
        this.loginFormGroup.reset()
      })
    }else{
      this.toastr.warning("Invalid Inputs")
      this.loginFormGroup.reset()
    }
  }

  submitRegister(){
    this.isRegisterButton = false
    if(this.firstFormGroup.valid && this.secondFormGroup.valid){
      this.secondFormGroup.value.birthDay= new Date(this.secondFormGroup.get("birthDay")?.value)
      let submitInfo = Object.assign({}, this.firstFormGroup.value, this.secondFormGroup.value);
      this._registerSubscription = this._authService.RegisterUser(submitInfo).subscribe((res)=>{
        this.toastr.success("Request submitted successfully")
        this.switchToRegister()
        this.loginFormGroup.reset()
        this.isRegisterButton = false
      },(err)=>{
        this.toastr.warning(err.error.detail)
        this.isRegisterButton = false
      })
    }else{
      this.isRegisterButton = false
      this.toastr.warning("Invalid Inputs")
    }
  }

}
