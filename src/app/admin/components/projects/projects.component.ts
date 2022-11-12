import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/service/project.service';
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
  }

  showProjectForm(){
    this.isShowProjectForm = !this.isShowProjectForm
  }
  
  getAllProjectDetails(){
    this.isShowFakeArray = true
    this._projectDetailsSubscription = this._projectService.getAllProjectDetails().subscribe((res)=>{
      this.projects = res
      let temp:any = []
      res.forEach((data:any)=>{
        if (new Date(data.Project.kickOff) > new Date()){
          data['status'] = 'pending'
        }else if (new Date(data.Project.dueDate)> new Date()){
          data['status'] = 'ongoing'
        }else{
          data['status'] = 'delay'
        }
        temp.push(data)
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
