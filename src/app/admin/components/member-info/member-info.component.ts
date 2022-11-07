import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/service/members.service';
import { ActivatedRoute,Router  } from '@angular/router'

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.css']
})
export class MemberInfoComponent implements OnInit {
  fakeBoolean:boolean = false
  fakeArray = new Array(3)
  userDetail:any;
  birthDay:any;
  dataLoader:boolean = true
  greetings:boolean = false
  Age:any;
  spinnerDeclineTrigger:boolean = false
  spinnerAcceptTrigger:boolean = false
  private _deleteMemberSubscription:Subscription = new Subscription()
  private _acceptMemberSubscription:Subscription = new Subscription()
  private _memberProfileSubscription:Subscription = new Subscription()
  constructor(
    private toastr:ToastrService,
    private _memberService:MembersService,
    private _routes:ActivatedRoute,
    private _router:Router
  ) { 
    this.getMemberProfileById()
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._deleteMemberSubscription.unsubscribe()
    this._acceptMemberSubscription.unsubscribe()
    this._memberProfileSubscription.unsubscribe()
  }


  getMemberProfileById(){
    this._memberProfileSubscription = this._memberService.getOneMemberInfo(this._routes.snapshot.paramMap.get('id')).subscribe((res)=>{
      this.userDetail = res
      this.dataLoader=false
      let bDay = new Date(this.userDetail.details.birthDay)
      let today = Date.now()
      let timeDiff = Math.abs(today - bDay.getTime())
      this.Age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25)
      if(new Date(today).getMonth() , bDay.getMonth() && new Date(today).getDate() == bDay.getDate()){
        this.greetings = true
        this.Age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25) + 1
      }else{
        this.greetings = false
      }
      this.birthDay =new Date(this.userDetail.details.birthDay)
    },(err)=>{
      if(err.error.detail[0].msg) this.toastr.warning(err.error.detail[0].msg)
      else if (err.error.detail) this.toastr.warning(err.error.detail)
      else this.toastr.warning("Server Error")
      this._router.navigate(['/dashboard/members'])
    }) ;
  }

  decline(){
    this.spinnerDeclineTrigger = true
    this._deleteMemberSubscription=this._memberService.deleteMembers(this._routes.snapshot.paramMap.get('id')).subscribe(()=>{
      this.spinnerDeclineTrigger= false
      this._router.navigate(['/dashboard/members'])
      this.toastr.success("Successfully declined the request!")
    },(err)=>{
      this.spinnerDeclineTrigger= false
      this.toastr.warning(err.error.detail)
    })
  }

  remove(){
    this.spinnerDeclineTrigger = true
    this._deleteMemberSubscription=this._memberService.deleteMembers(this._routes.snapshot.paramMap.get('id')).subscribe(()=>{
      this.spinnerDeclineTrigger= false
      this._router.navigate(['/dashboard/members'])
      this.toastr.success("Successfully remove the member!")
    },(err)=>{
      this.spinnerDeclineTrigger=false
      this.toastr.warning(err.error.detail)
    })
  }

  accept(){
    this.spinnerAcceptTrigger = true
    this._acceptMemberSubscription = this._memberService.acceptMembers(this._routes.snapshot.paramMap.get('id')).subscribe((res)=>{
      this.toastr.success('Request successfully accepted!')
      this.spinnerAcceptTrigger = false
      this.getMemberProfileById()
    },(err)=>{
      this.spinnerAcceptTrigger = false
      this.toastr.warning(err.error.detail)
    })
  }

}
