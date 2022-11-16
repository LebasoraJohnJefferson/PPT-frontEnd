import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/service/members.service';
import { ActivatedRoute,Router  } from '@angular/router'
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthUser } from 'src/app/service/auth-user.service';
import moment from 'moment';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.css']
})
export class MemberInfoComponent implements OnInit {
  defaultProfile:string = environment.default_profile
  hostingName:string = environment.baseURL
  fakeArray = new Array(3)
  userDetail:any;
  birthDay:any;
  Age:any;
  project_list:any=[]
  uploadFile:any;
  onLoadFile:any;
  dataLoader:boolean = true
  greetings:boolean = false
  fakeBoolean:boolean = false
  spinnerEditTrigger:boolean = false
  spinnerDeclineTrigger:boolean = false
  spinnerAcceptTrigger:boolean = false
  isUpdateButton:boolean = false
  isShowEditForm:boolean = false

  firstFormGroup: FormGroup = this._formBuilder.group({
    email: ['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    password2:['',[Validators.required]]
  });

  secondFormGroup: FormGroup = this._formBuilder.group({
    image:[''],
    fullName: ['',[Validators.required]],
    address:['',[Validators.required]],
    birthDay:['',[Validators.required]],
    gender:['',[Validators.required]]
  });


  private _deleteMemberSubscription:Subscription = new Subscription()
  private _acceptMemberSubscription:Subscription = new Subscription()
  private _memberProfileSubscription:Subscription = new Subscription()
  private _updateProfileSubscription:Subscription = new Subscription()
  private _getProjectByUserIdSubscription:Subscription = new Subscription()

  constructor(
    private toastr:ToastrService,
    private _memberService:MembersService,
    private _routes:ActivatedRoute,
    private _router:Router,
    private _formBuilder:FormBuilder,
    private _authService:AuthUser
  ) { 
    this.getMemberProfileById()
    this.getProjectJoined()
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._deleteMemberSubscription.unsubscribe()
    this._acceptMemberSubscription.unsubscribe()
    this._memberProfileSubscription.unsubscribe()
    this._updateProfileSubscription.unsubscribe()
    this._getProjectByUserIdSubscription.unsubscribe()
  }

  getProjectJoined(){
    this._getProjectByUserIdSubscription = this._memberService.getAllMembersByMemberID(this._routes.snapshot.paramMap.get('id')).subscribe((res)=>{
      this.project_list=res
    })
  }


  getMemberProfileById(){
    this._memberProfileSubscription = this._memberService.getOneMemberInfo(this._routes.snapshot.paramMap.get('id')).subscribe((res)=>{
      this.userDetail = res
      if(this.userDetail.details.image){
        this.onLoadFile = this.hostingName+'/users/profiles/'+this.userDetail.details.image
      }
      this.firstFormGroup.get('email')?.setValue(this.userDetail.details.email)
      this.secondFormGroup.get('fullName')?.setValue(this.userDetail.details.fullName)
      this.secondFormGroup.get('address')?.setValue(this.userDetail.details.address)
      let setBDay = moment(this.userDetail.details.birthDay).local().format('YYYY-MM-DD')
      this.secondFormGroup.get('birthDay')?.setValue(setBDay)
      this.secondFormGroup.get('gender')?.setValue(this.userDetail.details.gender)

      this.dataLoader=false
      let bDay = new Date(this.userDetail.details.birthDay)
      let today = Date.now()
      let timeDiff = Math.abs(today - bDay.getTime())
      this.Age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25)
      if(new Date(today).getMonth() , bDay.getMonth() && new Date(today).getDate() == bDay.getDate()){
        this.greetings = true
        this.Age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25)
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

  edit(){
    this.isShowEditForm = true
  }
  
  closeEdit(){
    this.isShowEditForm = false
  }

  onChange(event:any){
    if(event.target.files[0]){
      this.uploadFile = event.target.files[0]
    }
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.toastr.warning('You must select an image');
			return;
		}

		var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
      this.toastr.warning("Only images are supported")
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.onLoadFile = `${reader.result}` 
		}
  }

  imgProfileBtn(){
    let element: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    if (element) element.click();
  }

  submitUpdateDetails(){
    this.isUpdateButton=true
    if(this.firstFormGroup.valid && this.secondFormGroup.valid){
      let bDay = moment.utc(new Date(this.secondFormGroup.get("birthDay")?.value))
      let bDayTemp = moment(bDay).local().format('YYYY-MM-DD 00:00:00');
      this.secondFormGroup.value.birthDay= bDayTemp
      let submitInfo = Object.assign({}, this.firstFormGroup.value, this.secondFormGroup.value);
      this._updateProfileSubscription = this._authService.UpdateUser(this.uploadFile,submitInfo,this._routes.snapshot.paramMap.get('id'))
      .subscribe(()=>{
        this.closeEdit()
        this.getMemberProfileById()
        this.isUpdateButton=false
      },(err)=>{
        this.isUpdateButton=false
        this.toastr.warning(err.error.detail)
      })
    }
  }

}
