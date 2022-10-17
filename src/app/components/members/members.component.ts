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
  spinnerDeclineTrigger:number = 0
  spinnerAcceptTrigger:number = 0
  loadingCardFakeArray = new Array(10)
  loadingQuery:boolean=true
  isRegisterFormOpen:boolean = false
  isRegisterButton:boolean = false
  private _registerSubscription:Subscription = new Subscription()
  private _deleteMemberSubscription:Subscription = new Subscription()
  private _acceptMemberSubscription:Subscription = new Subscription()
  private _getAllMemberSubscription:Subscription = new Subscription()
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

  selectSortCategoryFormGroup:FormGroup = this._formBuilder.group({
    category:['All']
  })

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
    this._acceptMemberSubscription.unsubscribe()
    this._getAllMemberSubscription.unsubscribe()
  }

  registerFormBtn(){
    this.isRegisterFormOpen = !this.isRegisterFormOpen
  }

  selectCategory(){
    this.getMembers()
  }

  getMembers(){
    this.loadingQuery = true
    this._getAllMemberSubscription = this._memberService.getAllMembers().subscribe((res)=>{
      this.loadingQuery =false
      this.members = res
      if(this.selectSortCategoryFormGroup.controls.category.value != 'All'){
        if(this.members.length == 0 ) return
        let isJoin = this.selectSortCategoryFormGroup.controls.category.value == 'Joined' ? 1 : 0
        let temp_member:any = []
        this.members.forEach((member:any)=>{
          if(member.isAdminApprove == isJoin){
            temp_member.push(member)
          }
        })
        this.members = temp_member
      }
    },(err)=>{
      this.loadingQuery =false
    })
  }

  decline(id:any){
    this.spinnerDeclineTrigger = id
    this._deleteMemberSubscription=this._memberService.deleteMembers(id).subscribe(()=>{
      this.getMembers()
      this.spinnerDeclineTrigger=0
      this.toastr.success("Successfully declined the request!")
    },(err)=>{
      this.spinnerDeclineTrigger=0
      this.toastr.warning(err.error.detail)
    })
  }

  remove(id:any){
    this.spinnerDeclineTrigger = id
    this._deleteMemberSubscription=this._memberService.deleteMembers(id).subscribe(()=>{
      this.getMembers()
      this.spinnerDeclineTrigger=0
      this.toastr.success("Successfully remove the member!")
    },(err)=>{
      this.spinnerDeclineTrigger=0
      this.toastr.warning(err.error.detail)
    })
  }

  acceptMember(id:any){
    this.spinnerAcceptTrigger = id
    this._acceptMemberSubscription = this._memberService.acceptMembers(id).subscribe((res)=>{
      this.toastr.success('Request successfully accepted!')
      this.spinnerAcceptTrigger = 0
      this.getMembers()
    },(err)=>{
      this.spinnerAcceptTrigger = 0
      this.toastr.warning(err.error.detail)
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
        this.firstFormGroup.reset()
        this.secondFormGroup.reset()
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
