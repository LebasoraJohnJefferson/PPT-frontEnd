import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProjectsService } from 'src/app/service/projects.service';
import { CollaboratorService } from 'src/app/service/collaborator.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.css']
})
export class UsersDashboardComponent implements OnInit {

  projects:any = []
  defaultImage:string = environment.default_profile
  projectsJoined:any = []
  projectJoinedSearch:any = []
  openNumberById:number = -1
  isDetailsOpen:boolean = false
  isProjectInvitationOpen:boolean = false
  projectId:number = -1
  name:string='';
  isProjectDeclineOpen:boolean = false
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
    private _collaborateService:CollaboratorService,
    private _router:Router,
    public toastr:ToastrService
  ) {
    this.allProjectJoin()
    let role = localStorage.getItem('roles')
    if(role == 'MANAGER'){
      this._router.navigate(['/dashboard'])
      this.toastr.warning('Illegal Action!')
    }else if(role == 'ADMIN'){
      this._router.navigate(['/admin'])
      this.toastr.warning('Illegal Action!')
    }
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
      this.projectJoinedSearch = res
      console.log(res)
    })
  }

  search(event:any){
    console.log(this.projectJoinedSearch)
      let temp:any = []
      this.projectJoinedSearch.forEach((data:any) => {
        if(data.Project.projectCategory.includes(event.value.toUpperCase()) || 
        data.Project.projectName.includes(event.value) ||
        data.isPending.includes(event.value.toUpperCase())
          ){
          temp.push(data)
        }
      });
      this.projectsJoined = temp 
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


  deleteInvitationForCollaboration(id:any){
    this._deleteInvitationForCollaborationSubscription = this._collaborateService.rejectInvitationForCollaboration(id,'rejected')
    .subscribe((res)=>{
      this._toastr.success('Invitation Rejected Successfully!')
      this.isProjectDeclineOpen=false
      this.allProjectJoin()
    },(err)=>{
      this._toastr.error(err.error.detail)
    })
  }

  leaveProject(id:any){
    this._deleteInvitationForCollaborationSubscription = this._collaborateService.rejectInvitationForCollaboration(id,'leave')
    .subscribe((res)=>{
      this._toastr.success('Successfully leave the project!')
      this.isProjectInvitationOpen=false
      this.allProjectJoin()
    },(err)=>{
      this._toastr.error(err.error.detail)
    })
  }

  leaveInvitationOpen(id:number,name:string){
    this.isProjectInvitationOpen = !this.isProjectInvitationOpen
    this.name = name
    this.projectId = id
  }

  declineInvitationOpen(id:number,name:string){
    this.isProjectDeclineOpen = !this.isProjectDeclineOpen
    this.name = name
    this.projectId = id
  }

  
  openOption(id:number){
    this.openNumberById =  id!=this.openNumberById ? id : -1
  }

 

}










