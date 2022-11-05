import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute,Router  } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';



@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  defaultProfilePicture:string = environment.default_profile
  memberFakeArrayForAnimation = new Array(5)
  members:any = []
  projectInfo:any = []
  memberAvailableToAdd:any =[]
  memberId:any= 0
  memberName:any = ''
  age:any= 0
  birthDay:any = 0
  isMemberPlaceHolderAnimation:boolean = true
  isRemoveMemberConfirmation:boolean = false
  isRemovalOfMemberAnimation:boolean = false
  isShowAddMemberFormAnimationBtn:boolean = false
  isShowAddMemberForm:boolean = false
  isSwitch:boolean = true

  memberAddFormGroup:FormGroup = this._formBuilder.group({
    teamMembers:['',Validators.required],
  })

  private _projectInformation:Subscription = new Subscription()
  private _allJoinMembers:Subscription = new Subscription()
  private _removalOfMember:Subscription = new Subscription()
  private _addMemberIntoTheProject:Subscription = new Subscription()
  private _retrieveAllInfoCategorySubscription:Subscription = new Subscription()
  constructor(
    private _projectService:ProjectService,
    private _routes:ActivatedRoute,
    private _router:Router,
    private _toastr:ToastrService,
    private _formBuilder:FormBuilder

  ) { 
    this.getAllInformationOfProject()
    this.getAllMembers()
  }

  ngOnDestroy(){
    this._projectInformation.unsubscribe()
    this._allJoinMembers.unsubscribe()
    this._removalOfMember.unsubscribe()
    this._addMemberIntoTheProject.unsubscribe()
    this._retrieveAllInfoCategorySubscription.unsubscribe()
  }

  getAllInformationOfProject(){
    this._projectInformation = this._projectService.getProjectById(this._routes.snapshot.paramMap.get('id'))
    .subscribe((res)=>{
      this.projectInfo = res
      let timeDiff = Math.abs(Date.now() - new Date(this.projectInfo.Manager.managerDetails.birthDay).getTime())
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25)
      this.birthDay =new Date(this.projectInfo.Manager.managerDetails.birthDay)
    },()=>{
      this._toastr.warning("Project does`nt exist!")
      this._router.navigate(['/dashboard/projects'])
    })
  }

  removeMemberById(id:any,memberName:any){
    this.memberId = id
    this.isRemoveMemberConfirmation = true
    this.memberName = memberName
  }

  commitRemovalOfMember(){
    this.isRemovalOfMemberAnimation = true
    this._removalOfMember = this._projectService.removalOfMember(this.memberId).subscribe(()=>{
      this._toastr.success(`Successfully remove ${this.memberName}`)
      this.getAllMembers()
      this.closeRemovalOfMember()
    },(err)=>{
      this._toastr.warning(err.error.detail)
    })
  }

  closeRemovalOfMember(){
    this.memberId = 0
    this.isRemoveMemberConfirmation = false
    this.isRemovalOfMemberAnimation = false
    this.memberName = ''
  }

  addMemberIntoTheProject(){
    this.isShowAddMemberForm = true
    this._retrieveAllInfoCategorySubscription = this._projectService.getAllUserNotInProject(this._routes.snapshot.paramMap.get('id'))
    .subscribe((res)=>{
      this.memberAvailableToAdd=res
    })
  }

  closeMemberForm(){
    this.isShowAddMemberForm = false
  }

  submitAddMember(){
    this.isShowAddMemberFormAnimationBtn= true
    if(this.memberAddFormGroup.valid){
      this._addMemberIntoTheProject = this._projectService.addMemberIntoTheProject(this._routes.snapshot.paramMap.get('id'),this.memberAddFormGroup.value).subscribe(()=>{
        this.isShowAddMemberFormAnimationBtn = false
        this.getAllMembers()
        this.closeMemberForm()
        this._toastr.success("Members successfully added!")
        this.memberAddFormGroup.reset()
      },(err)=>{
        this._toastr.warning(err.error.detail)
        this.isShowAddMemberFormAnimationBtn = false
      })
    }else{
      this._toastr.warning("Empty Inputs!")
      this.isShowAddMemberFormAnimationBtn = false
    }
  }

  getAllMembers(){
    this.isMemberPlaceHolderAnimation = true
    this._allJoinMembers = this._projectService.getAllMemberByProjectId(this._routes.snapshot.paramMap.get('id')).subscribe((res)=>{
      this.members = res
      this.isMemberPlaceHolderAnimation = false
    })
  }

  switch(nav:string){
    this.isSwitch = nav == 'Project' ? true : false
  }

  ngOnInit(): void {
  }

}
