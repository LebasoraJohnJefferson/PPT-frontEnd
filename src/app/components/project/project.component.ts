import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/service/projects.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActivatedRoute,Router  } from '@angular/router'
import { ActivitiesService } from 'src/app/service/activities.service';
import { CollaboratorService } from 'src/app/service/collaborator.service';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';



@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  category:any = []
  // activityID:any = 0
  isEditTitleFormOpen:boolean = false
  isOpenForm:boolean = false
  isMemberDetailsOpen:boolean = false
  isFeedBackOpen:boolean = false
  isAddCollaboratorFormOpen:boolean = false
  data:any=[]
  bugs:any=[]
  activityToDelete:any = {name:'',id:0};
  projectId:any;
  title:any=''
  activityDependencies=[]
  collaborators:any = []

  createCollaboratorDetails:FormGroup = this._formBuilder.group({
    expertise:['',Validators.required],
    collaboratorId:[0,Validators.required]
  })

  editProjectNameTitle:FormGroup = this._formBuilder.group({
    projectName:['',Validators.required]
  })


  private _getAllActivitySubscription:Subscription = new Subscription()
  private _getAllProjectByIdSubscription:Subscription = new Subscription()
  private _updateProjectByIdSubscription:Subscription = new Subscription()
  private _deleteActivityByIdSubscription:Subscription = new Subscription()
  private _getAllNotCollaboratorsSubscription:Subscription = new Subscription()
  
  constructor(
    private _projectService:ProjectsService,
    private _activityService:ActivitiesService,
    private _toastr:ToastrService,
    private _routes:ActivatedRoute,
    private _router:Router,
    private _collaboratorsService:CollaboratorService,
    private _formBuilder:FormBuilder
  ) { 
    this.projectId = this._routes.snapshot.paramMap.get('id');
    this.getProjectById()
    this.getAllActivity()
  }

  ngOnInit(): void {

  }

  editTitle(title:any){
    this.title = title
    this.editProjectNameTitle.get('projectName')?.setValue(title)
    this.isEditTitleFormOpen = !this.isEditTitleFormOpen
  }

  editTitleCommit(){
    if(this.editProjectNameTitle.valid){
      this._updateProjectByIdSubscription = this._projectService.updateProjectName(this.projectId,this.editProjectNameTitle.value).subscribe(()=>{
        this._toastr.success("successfully update the projectName")
        this.getProjectById()
        this.isEditTitleFormOpen = false
      },(err)=>{  
        this._toastr.warning(err.error.detail)
      })
    }else{
      this._toastr.warning("Make sure fill out all inputs!")
    }
  }

  getAllActivity(){
    this._getAllActivitySubscription = this._activityService.getAllActivities(this.projectId)
    .subscribe((res)=>{
      this.data = res.data
      this.bugs = res.bugs
      let tempActivityDependencies:any = []
      this.data.forEach((data:any) => {
        tempActivityDependencies.push(data.Activity)
      });
      this.activityDependencies = tempActivityDependencies
    })
  }

  getProjectById(){
    this._getAllProjectByIdSubscription = this._projectService.getProjectById(this._routes.snapshot.paramMap.get('id'))
    .subscribe((res)=>{
      this.category = res
    },(err)=>{
      if(err.status==404) this._toastr.warning(err.error.detail)
      else if(err.status == 422) this._toastr.warning(err.error.detail[0].msg)
      else this._toastr.warning('Server Error')
      this._router.navigate(['/dashboard'])
    })
  }

  getAllNotCollaborator(){
    this._getAllNotCollaboratorsSubscription = this._collaboratorsService.getAllNotCollaborator(this.projectId).subscribe((res)=>{
      this.collaborators=res
    })
  }

  deleteActivity(event:any){
    this.activityToDelete = event
  }

  commitDeleteActivity(){
    this._deleteActivityByIdSubscription = this._activityService.deleteActivities(this.activityToDelete.id).subscribe(()=>{
      this._toastr.success(`${this.activityToDelete.name} successfully deleted!`)
      this.getAllActivity()
      this.activityToDelete.id = 0
    },(err)=>{
      this._toastr.warning(err.error.detail)
    })
  }

  closeDeleteNotification(){
    this.activityToDelete.id = 0
  }

  viewMembers(){
    this.isMemberDetailsOpen = !this.isMemberDetailsOpen
  }

  openCollaboratorForm(){
    this.isAddCollaboratorFormOpen = !this.isAddCollaboratorFormOpen
    this.createCollaboratorDetails.reset()
    this.getAllNotCollaborator()
  }

  createCollaborator(){
    if(this.createCollaboratorDetails.valid){
      this._collaboratorsService.createCollaborator(this.projectId,this.createCollaboratorDetails.value).subscribe((res)=>{
        this._toastr.success('successfully invited user to collaborate')
        this.openCollaboratorForm()
      },(err)=>{
        this._toastr.warning(err.error.detail)
      })
    }else{
      this._toastr.warning('make sure to fill out all inputs!')
    }
  }

  toggleForm(){
    this.isOpenForm = !this.isOpenForm
    this.getAllActivity()
  }


  ngOnDestroy() {
    this._getAllProjectByIdSubscription.unsubscribe()
    this._getAllActivitySubscription.unsubscribe()
    this._deleteActivityByIdSubscription.unsubscribe()
    this._getAllNotCollaboratorsSubscription.unsubscribe()
    this._updateProjectByIdSubscription.unsubscribe()
  }


}
