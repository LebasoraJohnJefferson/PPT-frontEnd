import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router'
import { Subscription } from 'rxjs';
import { ProjectsService } from 'src/app/service/projects.service';
import { CollaboratorService } from 'src/app/service/collaborator.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sub-tasks',
  templateUrl: './sub-tasks.component.html',
  styleUrls: ['./sub-tasks.component.css']
})
export class SubTasksComponent implements OnInit {
  activityName:any = ''
  isFeedBackOpen:boolean=false
  activityId:any=0
  activityDetails:any=[]
  isCreateSubTaskFormOpen:boolean = true
  duration:any=0
  fakeArray = new Array(10)
  collaboratorDetails:any={
    fullName:'UnKnown',
    address:'No Where',
    birthDay: new Date(),
    gender:'alien',
    email:'example@gmail.com',
    image:environment.default_profile
  }

  createTask:FormGroup = this._formBuilder.group({
    taskName:['',Validators.required],
    budget:[0,Validators.required],
    duration:[0,Validators.required],
    dependency:[[]],
    descriptions:['',Validators.required]
  })


  dependencies:any = []
  category:any = []
  projectId:any=0
  image:string=environment.default_profile
  private _getAllProjectByIdSubscription:Subscription = new Subscription()
  private _getCollaboratorAndActivityDetailsSubscription:Subscription = new Subscription()


  constructor(
    private _routes:ActivatedRoute,
    private _projectService:ProjectsService,
    private _toastr:ToastrService,
    private _router:Router,
    private _collaboratorService:CollaboratorService,
    private _formBuilder:FormBuilder
  ) { 
  }
  
  ngOnInit(): void {
    this.activityId = this._routes.snapshot.paramMap.get('activityId')
    this.projectId = this._routes.snapshot.paramMap.get('id')
    this.getProjectById()
    this.getCollaboratorAndActivityDetails()
  }

  submitCreateTask(){
    if(this.createTask.controls.budget.value <= 0){
      this._toastr.warning('budget must be higher than 0!')
      return
    }
    if(this.createTask.controls.duration.value <= 0){
      this._toastr.warning('duration must be higher than 0!')
      return
    }
    if(this.createTask.valid){
      console.log(this.createTask.value)
    }else{
      this._toastr.warning('Make sure too fill out all inputs!')
    }
    
  }

  changeDuration(event:any){
    this.duration = event.value
  }

  createFormOpen(){
    this.isCreateSubTaskFormOpen = true
  }

  closeFormCreateTask(){
    this.isCreateSubTaskFormOpen = false
  }

  getCollaboratorAndActivityDetails(){
    this._getCollaboratorAndActivityDetailsSubscription = this._collaboratorService.getActivityAndCollaboratorDetails(this.projectId,this.activityId)
    .subscribe((res)=>{
      if (res.Collaborator){
        this.collaboratorDetails =res.Collaborator
        this.image = res.Collaborator.image ? res.Collaborator.image : this.image
      }
      this.activityDetails =  res.Activity
      console.log(res)
    },(err)=>{
      if(err.status==404) this._toastr.warning(err.error.detail)
      else if(err.status == 422) this._toastr.warning(err.error.detail[0].msg)
      else this._toastr.warning('Server Error')
      this._router.navigate(['/dashboard'])
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

  openFeedBack(){
    this.isFeedBackOpen = true
  }

  openFeedBack2(event:any){
    this.isFeedBackOpen = false
  }

  ngOnDestroy() {
    this._getAllProjectByIdSubscription.unsubscribe()
    this._getCollaboratorAndActivityDetailsSubscription.unsubscribe()
  }

}
