import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { AuthUser } from 'src/app/service/auth-user.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/service/members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members:any = []
  isRegisterFormOpen:boolean = false
  isRegisterButton:boolean = false
  private _registerSubscription:Subscription = new Subscription()
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
    private _authService:AuthUser,
    public toastr:ToastrService,
    private _memberService:MembersService
  ) {
    this.getMembers()
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._registerSubscription.unsubscribe()
  }

  registerFormBtn(){
    this.isRegisterFormOpen = !this.isRegisterFormOpen
  }

  getMembers(){
    this._memberService.getAllMembers().subscribe((res)=>{
      this.members = res
      console.log(res)
    })
  }

  submitRegister(){
    if(this.firstFormGroup.valid && this.secondFormGroup.valid){
      this.secondFormGroup.value.birthDay= new Date(this.secondFormGroup.get("birthDay")?.value)
      let submitInfo = Object.assign({}, this.firstFormGroup.value, this.secondFormGroup.value);
      this._registerSubscription = this._authService.RegisterUser(submitInfo).subscribe((res)=>{
        this.toastr.success("Request submitted successfully")
        this.registerFormBtn()
        this.firstFormGroup.reset()
        this.secondFormGroup.reset()
        this.getMembers()
      },(err)=>{
        this.toastr.warning(err.error.detail)
      })
    }else{
      this.toastr.warning("Invalid Inputs")
    }
  }

}
