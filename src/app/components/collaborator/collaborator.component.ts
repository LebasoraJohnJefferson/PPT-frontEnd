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
  category:any=[]
  projectID:any;
  newDependencies:any=[]
  dependencies:any=[]
  percentage:any=0
  descriptionShowById:any=[]
  taskID:number = -1
  isFeedBackOpen:boolean = false

  private _getCredentialsSubscriptions:Subscription = new Subscription()
  private _projectDetailsSubscriptions:Subscription = new Subscription()
  private _activitiesDetailsSubscriptions:Subscription = new Subscription()
  private _taskDetailsSubscriptions:Subscription = new Subscription()
  private _changeStatusSubscriptions:Subscription = new Subscription()
  private _projectManagerDetailsSubscriptions:Subscription = new Subscription()


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

  ngOnDestroy(){
    this._getCredentialsSubscriptions.unsubscribe()
    this._projectDetailsSubscriptions.unsubscribe()
    this._taskDetailsSubscriptions.unsubscribe()
    this._activitiesDetailsSubscriptions.unsubscribe()
    this._changeStatusSubscriptions.unsubscribe()
    this._projectManagerDetailsSubscriptions.unsubscribe()
  }

}
