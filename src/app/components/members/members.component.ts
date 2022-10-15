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
  loadingCardFakeArray = new Array(10)
  loadingQuery:boolean=true
  isRegisterFormOpen:boolean = false
  isRegisterButton:boolean = false
  declineLoadingBtn:boolean = false
  private _registerSubscription:Subscription = new Subscription()
  private _deleteMemberSubscription:Subscription = new Subscription()
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
    this._deleteMemberSubscription.unsubscribe()
  }

  registerFormBtn(){
    this.isRegisterFormOpen = !this.isRegisterFormOpen
  }

  getMembers(){
    this._memberService.getAllMembers().subscribe((res)=>{
      this.members = res
      this.loadingQuery =false
    },(err)=>{
      this.loadingQuery =false
    })
  }

  decline(id:any){
    this.declineLoadingBtn = true
    this._deleteMemberSubscription=this._memberService.deleteMembers(id).subscribe(()=>{
      this.declineLoadingBtn = false
      this.getMembers()
    },(err)=>{
      this.toastr.warning(err.error.detail)
      this.declineLoadingBtn = false
    })
  }

  submitRegister(){
    this.isRegisterButton = true
    if(this.firstFormGroup.valid && this.secondFormGroup.valid){
      this.secondFormGroup.value.birthDay= new Date(this.secondFormGroup.get("birthDay")?.value)
      let submitInfo = Object.assign({}, this.firstFormGroup.value, this.secondFormGroup.value);
      this._registerSubscription = this._authService.RegisterUser(submitInfo).subscribe((res)=>{
        this.toastr.success("Request submitted successfully")
        this.isRegisterButton = false
        this.registerFormBtn()
        this.getMembers()
      },(err)=>{
        this.toastr.warning(err.error.detail)
        console.log(err)
        this.isRegisterButton = false
      })
    }else{
      this.isRegisterButton = false
      this.toastr.warning("Invalid Inputs")
    }
  }

}
