import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { ManagersService } from 'src/app/service/managers.service';
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
  managers:any = []
  categories:any = []
  projectInfo:any = []
  memberAvailableToAdd:any =[]
  memberId:any= 0
  categoryID:any = 0
  memberName:any = ''
  age:any= 0
  birthDay:any = 0
  isMemberPlaceHolderAnimation:boolean = true
  isRemoveMemberConfirmation:boolean = false
  isRemovalOfMemberAnimation:boolean = false
  isChangeMemberLoadingAnimation:boolean = true
  isChangeCategoryLoadingAnimation:boolean = false
  isChangeCategoryForm:boolean = false
  isShowAddMemberFormAnimationBtn:boolean = false
  isShowChangeManagerFormAnimationBtn:boolean = false
  isShowChangeCategoryFormAnimationBtn:boolean = false
  isShowAddMemberForm:boolean = false
  isShowAddManagerForm:boolean = false
  isSwitch:boolean = true

  memberAddFormGroup:FormGroup = this._formBuilder.group({
    teamMembers:['',Validators.required],
  })

  projectManagerFormGroup:FormGroup = this._formBuilder.group({
    id:['',Validators.required],
  })

  projectCategoryFormGroup:FormGroup = this._formBuilder.group({
    fullName:['',Validators.required],
    description:['',Validators.required],
  })

  private _projectInformation:Subscription = new Subscription()
  private _allJoinMembers:Subscription = new Subscription()
  private _removalOfMember:Subscription = new Subscription()
  private _addMemberIntoTheProject:Subscription = new Subscription()
  private _retrieveAllInfoCategorySubscription:Subscription = new Subscription()
  private _getAllProjectManger:Subscription = new Subscription()
  private _changeProjectManager:Subscription = new Subscription()
  private _changeCategoryManager:Subscription = new Subscription()

  constructor(
    private _projectService:ProjectService,
    private _routes:ActivatedRoute,
    private _router:Router,
    private _toastr:ToastrService,
    private _formBuilder:FormBuilder,
    private _managerService:ManagersService,
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
    this._getAllProjectManger.unsubscribe()
    this._changeProjectManager.unsubscribe()
    this._changeCategoryManager.unsubscribe()
  }

  getAllInformationOfProject(){
    this._projectInformation = this._projectService.getProjectById(this._routes.snapshot.paramMap.get('id'))
    .subscribe((res)=>{
      this.projectInfo = res
      let timeDiff = Math.abs(Date.now() - new Date(this.projectInfo.Manager.managerDetails.birthDay).getTime())
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25)
      this.birthDay =new Date(this.projectInfo.Manager.managerDetails.birthDay)
      console.log(res)
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

  changeManager(){
    this.isShowAddManagerForm = true
    this._getAllProjectManger = this._managerService.allManager().subscribe((res)=>{
      this.managers = res
    })
  }

  submitChangeMember(){
    this.isChangeMemberLoadingAnimation = true
    this.isShowChangeManagerFormAnimationBtn = true
    if(this.projectManagerFormGroup.valid){
      this._changeProjectManager = this._projectService.changeProjectManagerByProjectId(this._routes.snapshot.paramMap.get('id'),this.projectManagerFormGroup.value).subscribe(()=>{
        this.isShowChangeManagerFormAnimationBtn = false
        this.getAllInformationOfProject()
        this._toastr.success("Manager successfully changed!")
        this.closeChangeManager()
        this.isChangeMemberLoadingAnimation = false
      },(err)=>{
        this.isChangeMemberLoadingAnimation = false
        this._toastr.warning(err.error.detail)
        this.isShowChangeManagerFormAnimationBtn = false
      })
    }else{
      this.isChangeMemberLoadingAnimation = false
      this.isShowChangeManagerFormAnimationBtn = false
      this._toastr.warning("Empty Inputs!")
    }
  }
  
  closeChangeManager(){
    this.isShowAddManagerForm = false
  }

  changeCategory(id:any){
    this.categoryID = id
    this.projectCategoryFormGroup.get("fullName")?.setValue(this.projectInfo.Category.fullName)
    this.projectCategoryFormGroup.get("description")?.setValue(this.projectInfo.Category.description)
    this.isChangeCategoryForm = true
  }

  submitChangeCategory(){
    this.isChangeCategoryLoadingAnimation = true
    this.isShowChangeCategoryFormAnimationBtn = true
    if(this.projectCategoryFormGroup.valid){
      this._changeCategoryManager = this._projectService.changeProjectCategoryByProjectId(this.categoryID,this.projectCategoryFormGroup.value).subscribe(()=>{
        this._toastr.success("Successfully updated the category!")
        this.getAllInformationOfProject()
        this.closeChangeCategory()
        this.isChangeCategoryLoadingAnimation = false
        this.isShowChangeCategoryFormAnimationBtn = false
      },(err)=>{
        this._toastr.warning(err.error.detail)
        this.isChangeCategoryLoadingAnimation = false
        this.isShowChangeCategoryFormAnimationBtn = false
      })
    }else{
      this.isChangeCategoryLoadingAnimation = false
      this.isShowChangeCategoryFormAnimationBtn = false
      this._toastr.warning("Empty Inputs!")
    }
  }

  closeChangeCategory(){
    this.isChangeCategoryForm = false
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
