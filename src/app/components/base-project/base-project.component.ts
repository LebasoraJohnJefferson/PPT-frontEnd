import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ProjectsService } from 'src/app/service/projects.service';
import { CollaboratorService } from 'src/app/service/collaborator.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-base-project',
  templateUrl: './base-project.component.html',
  styleUrls: ['./base-project.component.css']
})
export class BaseProjectComponent implements OnInit {
  projects:any = []
  defaultImage:string = environment.default_profile
  projectsJoined:any = []
  openNumberById:number = -1
  isSwitchRole:boolean = true
  isDeleteProjectOpen:boolean = false
  isDetailsOpen:boolean = false
  projectId:number = -1
  name:string='';
  createBaseProjectFormGroup:FormGroup = this._formBuilder.group({
    projectName:['',Validators.required],
    projectCategory:['',Validators.required]
  })
  private _createProjectSubscription:Subscription = new Subscription()
  private _getAllProjectSubscription:Subscription = new Subscription()
  private _getAllProjectJoinSubscription:Subscription = new Subscription()
  private _deleteInvitationForCollaborationSubscription:Subscription = new Subscription()
  private _acceptInvitationForCollaborationSubscription:Subscription = new Subscription()
  private _deleteProjectByIdSubscription:Subscription = new Subscription()

  isCreateFormOpen:boolean = false
  constructor(
    private _formBuilder:FormBuilder,
    private _toastr:ToastrService,
    private _projectService:ProjectsService,
    private _collaborateService:CollaboratorService
  ) {
    this.getAllProject()
    this.allProjectJoin()
    let switchR = localStorage.getItem('switchRole')
    this.isSwitchRole = switchR == null || switchR== 'false'
  }
  
  ngOnInit(): void {
  }
  
  ngOnDestroy() {
    this._createProjectSubscription.unsubscribe()
    this._getAllProjectSubscription.unsubscribe()
    this._getAllProjectJoinSubscription.unsubscribe()
    this._deleteInvitationForCollaborationSubscription.unsubscribe()
    this._acceptInvitationForCollaborationSubscription.unsubscribe()
    this._deleteProjectByIdSubscription.unsubscribe()
  }

  allProjectJoin(){
    this._getAllProjectJoinSubscription = this._collaborateService.getAllProject().subscribe((res)=>{
      this.projectsJoined = res
    })
  }

  switchRole(){
    this.isSwitchRole = !this.isSwitchRole
    let switchR = localStorage.getItem('switchRole')
    localStorage.setItem('switchRole', switchR == 'true' ? 'false' : 'true');
  }


  getAllProject(){
    this._getAllProjectSubscription = this._projectService.getAllProject()
    .subscribe((res)=>{
      this.projects = res
    })
  }

  AcceptInvitationForCollaboration(id:any){
    this._acceptInvitationForCollaborationSubscription = this._collaborateService.acceptInvitationForCollaboration(id)
    .subscribe((res)=>{
      this._toastr.success('Invitation accepted Successfully!')
      this.allProjectJoin()
    },(err)=>{
      this._toastr.error(err.error.detail)
    })
  }

  initialProjectToDelete(id:number,name:string){
    this.isDeleteProjectOpen =!this.isDeleteProjectOpen
    this.projectId = id
    this.name = name
  }

  deleteProject(){
    this._deleteProjectByIdSubscription = this._projectService.deleteProject(this.projectId).subscribe((res)=>{
      this.getAllProject()
      this.isDeleteProjectOpen =false
      this._toastr.success(`${this.name} successfully deleted`)
    },()=>{
      this._toastr.error("Request Denied")
    })
  }

  deleteInvitationForCollaboration(id:any){
    this._deleteInvitationForCollaborationSubscription = this._collaborateService.rejectInvitationForCollaboration(id,'rejected')
    .subscribe((res)=>{
      this._toastr.success('Invitation Rejected Successfully!')
      this.allProjectJoin()
    },(err)=>{
      this._toastr.error(err.error.detail)
    })
  }

  leaveProject(id:any){
    this._deleteInvitationForCollaborationSubscription = this._collaborateService.rejectInvitationForCollaboration(id,'leave')
    .subscribe((res)=>{
      this._toastr.success('Successfully leave the project!')
      this.allProjectJoin()
    },(err)=>{
      this._toastr.error(err.error.detail)
    })
  }

  submitCreateProject(){
    if(this.createBaseProjectFormGroup.valid){
      this._createProjectSubscription = this._projectService
      .createProject(this.createBaseProjectFormGroup.value)
      .subscribe((res)=>{
        this._toastr.success('successfully created')
        this.createBaseProjectFormGroup.reset()
        this.getAllProject()
        this.CreateFormOpen('false')
      },(err)=>{
        if(err.error.detail){
          this._toastr.warning(err.error.detail)
        }
        else{
          this._toastr.error('An error occurred!')
        }
        
      })
    }else{
      this._toastr.warning('Make sure to fill out all inputs!')
    }
  }

  openOption(id:number){
    this.openNumberById =  id!=this.openNumberById ? id : -1
  }

  openDetailsById(id:number){

  }

  CreateFormOpen(isTrue:any){
    if(isTrue=='true'){
      this.isCreateFormOpen = true
    }else{
      this.isCreateFormOpen = false
    }
  }


}
