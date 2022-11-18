import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/service/project.service';
import { TasksService } from 'src/app/service/tasks.service';
import moment from 'moment';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  fakeProjectArray= new Array(3)
  isShowProjectForm:boolean = false
  projectName:string = ''
  projectId:number = 0
  managers:any = []
  members: any = []
  projects: any = []
  tasks: any = []
  data: any = []
  projectStatus:string = ''
  projectDetails: any = []
  showConformationToDelete:boolean = false
  loadingDeleteBtn:boolean = false
  loadingSubmitBtn:boolean = false
  isShowFakeArray:boolean = true

  private _retrieveAllInfoManagerSubscription:Subscription = new Subscription()
  private _retrieveAllInfoCategorySubscription:Subscription = new Subscription()
  private _SaveProjectSubscription:Subscription = new Subscription()
  private _projectDetailsSubscription:Subscription = new Subscription()
  private _deleteProjectById:Subscription = new Subscription()
  private _getAllTask:Subscription = new Subscription()


  projectFormGroup:FormGroup = this._formBuilder.group({
    projectName:['',Validators.required],
    budget:[0,Validators.required],
    kickOff:['',Validators.required],
    dueDate:['',Validators.required],
    teamMembers:[[]],
    dependencies:[[]],
    projectManager:['',Validators.required],
    description:['',Validators.required]
  })

  constructor(
    private _formBuilder:FormBuilder,
    private _toastr:ToastrService,
    private _projectService:ProjectService,
    private _taskService:TasksService
  ) {
    this.getAllDetails()
    this.getAllProjectDetails()
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._retrieveAllInfoManagerSubscription.unsubscribe()
    this._retrieveAllInfoCategorySubscription.unsubscribe()
    this._SaveProjectSubscription.unsubscribe()
    this._projectDetailsSubscription.unsubscribe()
    this._deleteProjectById.unsubscribe()
    this._getAllTask.unsubscribe()
  }

  showProjectForm(){
    this.isShowProjectForm = !this.isShowProjectForm
  }

  async getAllProjectDetails(){
    this.isShowFakeArray = true
    this._projectDetailsSubscription = await this._projectService.getAllProjectDetails().subscribe((res)=>{
      this.projects = res
      this.projects.forEach((data:any)=>{

        this._getAllTask = this._taskService.getAllTask(data.Project.id).subscribe((res)=>{
          this.tasks = res
          let format = 'YYYY-MM-DD HH:mm:ss'
          this.projectStatus = 'normal'
          let count = 0
          console.log(this.tasks.length)
          this.tasks.forEach((data2:any)=>{
            let TheDayBeforeDueDate = moment(data2.dueDate).subtract(1, 'days').startOf('day').format(format)
            let dueDate = moment(data2.dueDate).format(format)
            let today =  moment().format(format)
            if(data2.status == 'done'){
              count+=1
            }
            if(today > TheDayBeforeDueDate && today<dueDate && data2.status !="done"){
              if(this.projectStatus == "normal" ){
                this.projectStatus = 'soonToEnd'
              }
            }else if(TheDayBeforeDueDate<today && data2.status !="done"){
              if(this.projectStatus == 'normal' || this.projectStatus == 'soonToEnd'){
                this.projectStatus  = "delay"
              }
            }else{
              if(this.projectStatus != 'soonToEnd' && this.projectStatus != 'delay'){
                this.projectStatus = 'normal'
              }
            }
          })
          if (new Date(data.Project.kickOff) > new Date()){
            data['status'] = 'pending'
          }else if (new Date(data.Project.dueDate)> new Date()){
            data['status'] = 'ongoing'
          }else{
            data['status'] = 'delay'
          }
          if(this.tasks.length == count){
            data['status'] = "done"
            this.projectStatus = 'done'
          }
          data['projectStatus']=this.projectStatus
        })
      })
      this.projectDetails = res
      this.isShowFakeArray = false
    })
  }

  projectDeleteById(id:number,projectName:string){
    this.projectName = projectName
    this.showConformationToDelete = true
    this.projectId = id
  }

  closeNotification(){
    this.projectName = ''
    this.showConformationToDelete = false
    this.projectId = 0
  }

  projectCommitDeleteById(){
    this.loadingDeleteBtn = true
    this._deleteProjectById = this._projectService.deleteProject(this.projectId).subscribe(()=>{
      this.loadingDeleteBtn = false
      this._toastr.success(`Project named ${this.projectName} successfully deleted!`)
      this.getAllProjectDetails()
      this.closeNotification()
    },(err)=>{
      this.loadingDeleteBtn = false
      this.closeNotification()
      this._toastr.warning(err.error.detail)
    })
  }

  getAllDetails(){
    this._retrieveAllInfoManagerSubscription = this._projectService.retrieveAllInfoManager()
    .subscribe((res)=>{
      this.managers=res
    })
    this._retrieveAllInfoCategorySubscription = this._projectService.retrieveAllInfoCategory()
    .subscribe((res)=>{
      this.members=res
    })
  }

  
  submitProject(){
    this.loadingSubmitBtn = true
    if(this.projectFormGroup.valid){
      let kickOffTemp = moment.utc(new Date(this.projectFormGroup.controls.kickOff.value))
      let kickLocal = moment(kickOffTemp).local().format('YYYY-MM-DD HH:mm:ss');
      let dueDateTemp = moment.utc(new Date(this.projectFormGroup.controls.dueDate.value))
      let dueLocal = moment(dueDateTemp).local().format('YYYY-MM-DD HH:mm:ss');
      this.projectFormGroup.value.kickOff= kickLocal
      this.projectFormGroup.value.dueDate= dueLocal
      this._SaveProjectSubscription = this._projectService.SaveProject(this.projectFormGroup.value).subscribe(()=>{
        this._toastr.success("Project successfully created!")
        this.getAllProjectDetails()
        this.isShowProjectForm = false
        this.loadingSubmitBtn = false
      },(err)=>{
        if(err.error.detail) this._toastr.warning(err.error.detail)
        else if (err.error.detail.msg) this._toastr.warning(err.error.detail.msg)
        else this._toastr.warning("server error")
        this.loadingSubmitBtn = false
      })
    }else{
      this.loadingSubmitBtn = false
      this._toastr.warning("Invalid Inputs")
    }
  }

}
