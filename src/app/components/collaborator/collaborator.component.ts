import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute  } from '@angular/router'
import { CollaboratorUsersService } from 'src/app/service/collaborator-users.service';
import { ToastrService } from 'ngx-toastr';
import { SubTasksService } from 'src/app/service/sub-tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.css']
})
export class CollaboratorComponent implements OnInit {
  projectId:any;
  ActivityID:any = -1
  projectDetails:any=[]
  displayedColumns: string[] = ['activityName', 'budget', 'stage', 'dueDate','kickOff','descriptions','id'];
  dataSource:any=[];
  tasks:any=[];
  tempTask:any=[];
  bugs:any=[]
  globalStage:string = ''
  category:any=[]
  projectID:any;
  newDependencies:any=[]
  dependencies:any=[]
  percentage:any=0
  descriptionShowById:any=[]
  taskID:number = -1
  isFeedBackOpen:boolean = false
  isActivityDone = false
  isEditSubTaskOpen:boolean = false
  isCreateSubTaskFormOpen:boolean= false
  editTaskDependencyArray:any;
  DataToBeEdited:any = {}
  isDeleteNotificationOpen:boolean = false
  taskToBeDeleted:string = ''
  taskIdToBeDEleted:number = -1
  isUploadOpen:boolean = false

  private _getCredentialsSubscriptions:Subscription = new Subscription()
  private _projectDetailsSubscriptions:Subscription = new Subscription()
  private _activitiesDetailsSubscriptions:Subscription = new Subscription()
  private _taskDetailsSubscriptions:Subscription = new Subscription()
  private _changeStatusSubscriptions:Subscription = new Subscription()
  private _projectManagerDetailsSubscriptions:Subscription = new Subscription()
  private _getTaskByIDSubscription:Subscription = new Subscription()


  constructor(
    private _router:Router,
    private _routes:ActivatedRoute,
    private _collaboratorUserService:CollaboratorUsersService,
    public toastr:ToastrService,
    private _subTaskService:SubTasksService
  ) { 
  }

  ngOnInit(): void {
    this.projectID = this._routes.snapshot.paramMap.get('projectID')
    if(this.projectID) this.getProjectManager()
    this.projectId = this._routes.snapshot.paramMap.get('projectID')
    if (this.projectId){
      this.getCredentials()
      this.getProjectDetails()
    } 
  
  }

  getCredentials(){
    this._getCredentialsSubscriptions = this._collaboratorUserService.checkCredentials(this.projectId).subscribe(()=>{
    },()=>{
      this._router.navigate(['/dashboard'])
      this.toastr.warning("Not Authorized")
    })
  }

  getProjectDetails(){
    this._projectDetailsSubscriptions = this._collaboratorUserService.getProjectDetails(this.projectId).subscribe((res)=>{
      let temp:any = []
      this.dependencies = res.depend
      res.activities.forEach((data:any)=>{
          temp.push(
            {
              activityName:data.activityName,
              budget:data.budget, 
              stage:data.stage,
              dueDate:data.dueDate,
              kickOff:data.kickOff,
              descriptions:data.descriptions,
              id:data.id})
        })
      this.dataSource = temp
      if(this.ActivityID != -1){
        res.activities.forEach((activity:any) => {
          if(activity.id == this.ActivityID){
            this.globalStage = activity.stage
          }
        });
        this.getTasks()
      }
    })
  }

  openActivityByID(id:number){
    this.ActivityID = id == this.ActivityID ? -1 : id
    this.getProjectDetails()
  }

  getTasks(){
    this.newDependencies = []
    if(this.dependencies != 0){
      this._activitiesDetailsSubscriptions = this._collaboratorUserService.getActivity(this.ActivityID).subscribe((res:any)=>{
        let newArr:any = []
        let idArray = res.activitiesId
        this.dependencies.forEach((data:any)=>{
          if (idArray.indexOf(data.dependencies.id) !== -1) newArr.push(data)
        })
        this.newDependencies = newArr
      })
    }
    this._taskDetailsSubscriptions = this._subTaskService.getAllSubTask(this.ActivityID).subscribe((res)=>{
      this.tasks = res.tasks
      let countTask = 0
      this.tasks.forEach((task:any)=>{
        if(task.data.date_status == 'done' && (this.globalStage == "builds" || this.globalStage == 'maintenance' || this.globalStage == 'verifies')){
          countTask+=1
        }
      })
      this.isActivityDone = this.tasks.length == countTask ? true : false
      this.tempTask = res.tasks
      this.bugs = res.bugs
      this.percentage = res.percentage
      }
    )
  }

  openTaskDescription(taskID:number){
    this.descriptionShowById = taskID == this.descriptionShowById ? -1 : taskID
  }

  openFeedBack2(event:any){
    this.isFeedBackOpen = false
  }

  openFeedBack(id:any){
    this.isFeedBackOpen = true
    this.taskID = id
  }


  changeStatus(taskId:number){
    this._changeStatusSubscriptions = this._subTaskService.changeTaskStatus(taskId).subscribe(()=>{
      this.getTasks()
    },(err)=>{
      this.toastr.warning(err.error.detail)
    })
  }

  
  getProjectManager(){
    this._projectManagerDetailsSubscriptions = this._collaboratorUserService.project_manager_details(this.projectID).subscribe((res)=>{
      this.projectDetails = res
      this.category = res.projectCategory
    })
  }

  closeFormCreateTask(){
    this.isCreateSubTaskFormOpen = !this.isCreateSubTaskFormOpen
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

  openDeleteNotification(taskName:string,taskID:number){
    this.isDeleteNotificationOpen = true
    this.taskToBeDeleted = taskName
    this.taskIdToBeDEleted = taskID
  }

  commitDeleteTask(){
    this._subTaskService.deleteOneTask(this.taskIdToBeDEleted).subscribe((res)=>{
      this.getTasks()
      this.toastr.success(`successfully deleted ${this.taskToBeDeleted}`)
      this.isDeleteNotificationOpen = false
    },(err)=>{
      this.toastr.warning("An Error Occurred")
    })
  }

  closeEditForm(){
    this.isEditSubTaskOpen = false
  }

  closeDeleteNotification(){
    this.isDeleteNotificationOpen = false
  }

  closeUpload(){
    this.isUploadOpen = false
  }

  openUpload(id:any){
    this.isUploadOpen = true
    this.ActivityID = id
  }

  ngOnDestroy(){
    this._getCredentialsSubscriptions.unsubscribe()
    this._projectDetailsSubscriptions.unsubscribe()
    this._taskDetailsSubscriptions.unsubscribe()
    this._activitiesDetailsSubscriptions.unsubscribe()
    this._changeStatusSubscriptions.unsubscribe()
    this._projectManagerDetailsSubscriptions.unsubscribe()
    this._getTaskByIDSubscription.unsubscribe()
  }

}
