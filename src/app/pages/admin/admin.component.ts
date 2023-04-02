import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  changeTypeInPassword:string = 'password'
  isLogin:boolean = false


  loginFormGroup: FormGroup = this._formBuilder.group({
    username: ['',[Validators.required]],
    password:['',[Validators.required]]
  })

  private _identityCheck:Subscription = new Subscription()

  constructor(
    private _formBuilder: FormBuilder,
    private _adminService:AdminService,
    private _toastr:ToastrService,
    private _router:Router
  ) { }


  SubmitLogin(){
    if(this.loginFormGroup.valid){
      this.isLogin = true
      this._identityCheck = this._adminService.getCredentials(this.loginFormGroup.value).subscribe((res)=>{
        localStorage.setItem('token',res.access_token)
        localStorage.setItem('roles','ADMIN')
        this._router.navigate(['/admin/dashboard'])
        this._toastr.success("Successfully Login")
        this.isLogin = false
      },()=>{
        this.isLogin = false
        this.loginFormGroup.reset()
        this._toastr.warning("Account does`nt Exist")
      })  
    }else{
      this.isLogin = false
      this._toastr.warning("Invalid Inputs")
    }
  }

  showPassword(){
    this.changeTypeInPassword = this.changeTypeInPassword == 'password' ? 'text' : 'password'
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._identityCheck.unsubscribe()
  }

}
