import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/service/admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {

  isLogin:boolean = false

  private _editAdminInfoSubscription:Subscription = new Subscription()

  editAdminInfoForm:FormGroup = this._formBuilder.group({
    username:['',[Validators.required]],
    password:['',[Validators.required]],
    confirmPassword:['',[Validators.required]],
  })

  constructor(
    public toastr:ToastrService,
    private router:Router,
    private _formBuilder:FormBuilder,
    private _adminService:AdminService
  ) { }

  ngOnInit(): void {
  }

  editAdminInfo(){
    this.isLogin = true
    if(this.editAdminInfoForm.controls.password.value != this.editAdminInfoForm.controls.confirmPassword.value){
      this.toastr.warning("Password and Confirm Password not matched!")
      this.editAdminInfoForm.reset()
      this.isLogin = false
      return
    }
    if(this.editAdminInfoForm.valid){
      this._editAdminInfoSubscription = this._adminService.editAdminDetails(this.editAdminInfoForm.value).subscribe(()=>{
        this.editAdminInfoForm.reset()
        this.toastr.success("Successfully Edited!")
        this.isLogin = false
      },(err)=>{
        this.toastr.warning(err.error.detail)
        this.isLogin = false
      })
    }else{
      this.toastr.warning("Invalid Inputs")
      this.editAdminInfoForm.reset()
      this.isLogin = false
    }
  }

  ngOnDestroy(){
    this._editAdminInfoSubscription.unsubscribe()
  }

  logout(){
    this.toastr.success("Logout successfully")
    localStorage.removeItem("token")
    this.router.navigate(['/admin'])
  }

}
