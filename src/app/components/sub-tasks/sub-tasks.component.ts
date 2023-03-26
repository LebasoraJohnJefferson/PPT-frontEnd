import { CollaboratorService } from 'src/app/service/collaborator.service';
import { SubTasksService } from 'src/app/service/sub-tasks.service';
import { ProjectsService } from 'src/app/service/projects.service';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ActivitiesService } from 'src/app/service/activities.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import moment from 'moment';

@Component({
  selector: 'app-sub-tasks',
  templateUrl: './sub-tasks.component.html',
  styleUrls: ['./sub-tasks.component.css']
})
export class SubTasksComponent implements OnInit {
  showRecommendationDateIcon:boolean=false
  isDeleteNotificationOpen:boolean = false
  isCreateSubTaskFormOpen:boolean = false
  isRecommendDate:boolean = false
  isEditActivityOpen:boolean=false
  isEditSubTaskOpen:boolean = false
  isAllTasksDone:boolean = false
  activityDependencies:any=[]
  descriptionShowById:number = -1
  isFeedBackOpen:boolean=false
  subTaskID:number = -1
  taskToBeEdited:string = ''
  taskToBeDeleted:string = ''
  taskIdToBeDEleted:number = 0
  durationTask:number = 0
  activityDetails:any=[]
  activityName:any = ''
  activityId:any=0
  duration:any=0
  percentage:number = 0
  gannttData:any;
  tempTask:any=[]
  bugs:any=[]
  DataToBeEdited:any={};
  editTaskDependencyArray:any;
  fakeArray = new Array(10)
  collaboratorDetails:any={
    fullName:'N/A',
    address:'No Where',
    birthDay: new Date(),
    gender:'N/A',
    email:'example@gmail.com',
    image:environment.default_profile
  }

  

  


  tasks:any = []
  category:any = []
  projectId:any=0
  image:string=environment.default_profile
  private _getAllProjectByIdSubscription:Subscription = new Subscription()
  private _getCollaboratorAndActivityDetailsSubscription:Subscription = new Subscription()
  private _getAllSubTaskSubscription:Subscription = new Subscription()
  private _updateSubTaskSubscription:Subscription = new Subscription()
  private _getTaskByID:Subscription = new Subscription()
  private _updateSubTaskStatusSubscription:Subscription = new Subscription()
  private _updateTaskByIdSubscription:Subscription = new Subscription()
  private _updateActivityByIdSubscription:Subscription = new Subscription()
  private _getTaskByIDSubscription:Subscription = new Subscription()
  editActivity:FormGroup = this._formBuilder.group({
    activityName:['',Validators.required],
    budget:[0,Validators.required],
    kickOff:['',Validators.required],
    dueDate:['',Validators.required],
    dependencies:[[]],
    descriptions:['',Validators.required]
  })


  constructor(
    private _routes:ActivatedRoute,
    private _projectService:ProjectsService,
    private _toastr:ToastrService,
    private _router:Router,
    private _subTaskService:SubTasksService,
    private _collaboratorService:CollaboratorService,
    private _activitiesService:ActivitiesService,
    private _formBuilder:FormBuilder
  ) { 
  }
  
  ngOnInit(): void {
    this.activityId = this._routes.snapshot.paramMap.get('activityId')
    this.projectId = this._routes.snapshot.paramMap.get('id')
    this.getProjectById()
    this.getAllSubTask()
  }


  getAllSubTask(){
    this._getAllSubTaskSubscription = this._subTaskService.getAllSubTask(this.activityId).subscribe((res)=>{
      this.tasks = res.tasks
      this.tempTask = res.tasks
      this.gannttData = res.ganttData
      this.bugs = res.bugs
      this.percentage = res.percentage
      let count = 0
      this.tasks.forEach((task:any) => {
        if(task.taskInfo.status == true) count+=1
      });
      this.isAllTasksDone = count == this.tasks.length ? true : false
      this.getCollaboratorAndActivityDetails()
    })
  }

  

  getCollaboratorAndActivityDetails(){
    this._getCollaboratorAndActivityDetailsSubscription = this._collaboratorService.getActivityAndCollaboratorDetails(this.projectId,this.activityId)
    .subscribe((res)=>{
      if (res.Collaborator){
        this.collaboratorDetails =res.Collaborator
        this.image = res.Collaborator.image ? res.Collaborator.image : this.image
      }
      this.activityDetails =  res.Activity
      let recommendDate = moment(res.Activity.recommendDate)
      let dueDate = moment(res.Activity.dueDate)
      this.showRecommendationDateIcon = dueDate.isBefore(recommendDate)
    },(err)=>{
      if(err.status==404) this._toastr.warning(err.error.detail)
      else if(err.status == 422) this._toastr.warning(err.error.detail[0].msg)
      else this._toastr.warning('Server Error')
      this._router.navigate(['/dashboard'])
    })
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

  openFeedBack(taskID:any){
    this.isFeedBackOpen = true
    this.subTaskID = taskID
  }
  

  openFeedBack2(event:any){
    this.isFeedBackOpen = false
  }

  editActivityDetails(){
    this.isEditActivityOpen = !this.isEditActivityOpen
    this._updateActivityByIdSubscription = this._activitiesService.getActivityDependencies(this.activityId).subscribe(
      (res)=>{
        this.activityDependencies = res.activityDependencies
        this.editActivity.controls.dependencies.setValue(res.depend)
        this.editActivity.controls.activityName.setValue(this.activityDetails.activityName)
        this.editActivity.controls.budget.setValue(this.activityDetails.budget)
        this.editActivity.controls.kickOff.setValue(this.activityDetails.kickOff)
        this.editActivity.controls.dueDate.setValue(this.activityDetails.dueDate)
        this.editActivity.controls.descriptions.setValue(this.activityDetails.descriptions)
      }
    )

  }

  submitEditActivity(){
    if(this.editActivity.valid && this.editActivity.value){
      this._updateSubTaskSubscription= this._activitiesService.updateActivitiesDetails(this.activityId,this.editActivity.value).subscribe((res)=>{
        this.getAllSubTask()
        this._toastr.success('Successfully updated!')
        this.isEditActivityOpen = !this.isEditActivityOpen
      },(err)=>{
        this._toastr.warning(err.error.detail)
      })
    }else{
      this._toastr.warning('invalid input!')
    }
  }

  openDeleteNotification(taskName:string,taskID:number){
    this.isDeleteNotificationOpen = true
    this.taskToBeDeleted = taskName
    this.taskIdToBeDEleted = taskID
  }

  commitDeleteTask(){
    this._subTaskService.deleteOneTask(this.taskIdToBeDEleted).subscribe((res)=>{
      this.getAllSubTask()
      this._toastr.success(`successfully deleted ${this.taskToBeDeleted}`)
      this.isDeleteNotificationOpen = false
    },(err)=>{
      this._toastr.warning("An Error Occurred")
    })
  }

  closeDeleteNotification(){
    this.isDeleteNotificationOpen = false
  }

  

  closeEditForm(){
    this.isEditSubTaskOpen = false
  }

  openEditForm(taskName:string,taskID:number,duration:number,descriptions:string,dependencies:any){
    this._getTaskByIDSubscription = this._subTaskService.getDependencyById(taskID).subscribe((res)=>{
      this.editTaskDependencyArray = res
      let dependAssigned = Array.from(dependencies.split(","), Number)
      this.DataToBeEdited = {
        'taskName':taskName,
        'taskID':taskID,
        'duration':duration,
        'dependencies':this.editTaskDependencyArray,
        'dependAssigned':dependAssigned,
        'descriptions':descriptions
      }
      this.isEditSubTaskOpen = true

    })
  }

  openTaskDescription(id:number){
    this.descriptionShowById = this.descriptionShowById != id ? id : -1
  }

  changeStatus(taskId:number){
    this._updateSubTaskStatusSubscription = this._subTaskService.changeTaskStatus(taskId).subscribe(()=>{
      this.getAllSubTask()
    },(err)=>{
      this._toastr.warning(err.error.detail)
    })
  }

  seeRecommendDate(){
    this.isRecommendDate = !this.isRecommendDate
  }

  searchTask(event:any){
    let temp:any = []
    this.tempTask.forEach((taskData:any) => {
      if(taskData.data.date_status.includes(event.value) 
        || taskData.data.name.includes(event.value)){
        temp.push(taskData)
      }
    });
    this.tasks = temp 
  }


  ngOnDestroy() {
    this._getCollaboratorAndActivityDetailsSubscription.unsubscribe()
    this._updateSubTaskStatusSubscription.unsubscribe()
    this._getAllProjectByIdSubscription.unsubscribe()
    this._updateTaskByIdSubscription.unsubscribe()
    this._getAllSubTaskSubscription.unsubscribe()
    this._getTaskByIDSubscription.unsubscribe()
    this._updateActivityByIdSubscription.unsubscribe()
    this._updateSubTaskSubscription.unsubscribe()
    this._getTaskByID.unsubscribe()
  }

}
