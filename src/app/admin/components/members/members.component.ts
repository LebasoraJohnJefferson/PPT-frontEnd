import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { AuthUser } from 'src/app/service/auth-user.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/service/members.service';
import moment from 'moment';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members:any = []
  memberId:number = 0
  memberName:string = ''
  spinnerDeclineTrigger:number = 0
  spinnerAcceptTrigger:number = 0
  loadingCardFakeArray = new Array(10)
  loadingQuery:boolean=true
  loadingRemoveBtn:boolean=false
  isRegisterFormOpen:boolean = false
  isRegisterButton:boolean = false
  isDeleteMemberShow:boolean = false
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
    this.members = []
    this._getAllMemberSubscription = this._memberService.getAllMembers().subscribe((res)=>{
      this.loadingQuery =false
      this.members = res
      let filterEvent = this.selectSortCategoryFormGroup.controls.category.value
      if(filterEvent != 'All'){
        if(this.members.length == 0 ) return
        let temp_member:any = []
        if(filterEvent=='Joined' || filterEvent == 'Joining'){
          let isJoin = filterEvent == 'Joined' ? 1 : 0
          this.members.forEach((member:any)=>{
            if(member.details.isAdminApprove == isJoin){
              temp_member.push(member)
            }
          })
        }else{
          let role = filterEvent == 'Manager' ? true : false 
          this.members.forEach((member:any)=>{
            if(member.isManager == role){
              temp_member.push(member)
            }
          })
        }
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

  showNotification(id:number,name:string){
    this.memberId= id
    this.isDeleteMemberShow = true
    this.memberName = name
  }
  
  closeNotification(){
    this.memberId= 0
    this.isDeleteMemberShow = false
  }

  remove(){
    this.spinnerDeclineTrigger = this.memberId
    this.loadingRemoveBtn=true
    this._deleteMemberSubscription=this._memberService.deleteMembers(this.memberId).subscribe(()=>{
      this.getMembers()
      this.spinnerDeclineTrigger=0
      this.loadingRemoveBtn=false
      this.isDeleteMemberShow = false
      this.toastr.success("Successfully remove the member!")
    },(err)=>{
      this.loadingRemoveBtn=false
      this.isDeleteMemberShow = false
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
      let bDay = moment.utc(new Date(this.secondFormGroup.get("birthDay")?.value))
      let bDayTemp = moment(bDay).local().format('YYYY-MM-DD 00:00:00');
      this.secondFormGroup.value.birthDay= bDayTemp
      let submitInfo = Object.assign({}, this.firstFormGroup.value, this.secondFormGroup.value);
      this._registerSubscription = this._authService.RegisterUserByAdmin(submitInfo).subscribe((res)=>{
        this.toastr.success("Created member successfully")
        this.isRegisterButton = false
        this.registerFormBtn()
        this.getMembers()
        this.firstFormGroup.reset()
        this.secondFormGroup.reset()
      },(err)=>{
        if(err.status == 422) this.toastr.warning(err.error.detail[0].msg)
        else this.toastr.warning(err.error.detail)
        this.isRegisterButton = false
        this.isRegisterButton = false
      })
    }else{
      this.isRegisterButton = false
      this.toastr.warning("Invalid Inputs")
    }
  }

}
