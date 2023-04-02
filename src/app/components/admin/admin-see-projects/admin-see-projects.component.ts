import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { EventEmitterService } from 'src/app/service/event-emitter.service';


@Component({
  selector: 'app-admin-see-projects',
  templateUrl: './admin-see-projects.component.html',
  styleUrls: ['./admin-see-projects.component.css']
})
export class AdminSeeProjectsComponent implements OnInit {
  projects:any = []
  displayedColumns: string[] = ['manager', 'projectName', 'category', 'percent','id'];
  isDelProject:boolean = false
  projectId:number = -1
  data:any;
  users:any=[]
  isChangeSubmit:boolean = false
  isChangeNotificationOpen:boolean = false

  editProjectForm:FormGroup = this._formBuilder.group({
    projectName:['',[Validators.required]],
  })

  private _getAllProjectSubscription:Subscription = new Subscription()
  private _deleteProjectSubscription:Subscription = new Subscription()
  private _getAllUserSubscriptions:Subscription = new Subscription()
  private _editProjectSubscription:Subscription = new Subscription()

  constructor(
    private _adminService:AdminService,
    public toastr:ToastrService,
    private _formBuilder:FormBuilder,
    private _eventEmitterService:EventEmitterService
  ) { }

  ngOnInit(): void {
    this.getAllProjects()
    this.getAllUsers()
  }

  getAllUsers(){
    this._getAllUserSubscriptions = this._adminService.getAllUsers().subscribe((res)=>{
      this.users = res
    })
  }

  getAllProjects(){
    this._getAllProjectSubscription = this._adminService.getAllProjects().subscribe((res)=>{
      this.projects = res
    })
  }

  deleteProject(projectId:number){
    this.projectId = projectId
    this.isDelProject = true
    this.data = this.projects.filter((data:any)=>{
      if( data.id == projectId) return data
    })
  }

  commitDelProject(){
    this._deleteProjectSubscription = this._adminService.deleteProjectById(this.projectId).subscribe(()=>{
      this.getAllProjects()
      this.getAllUsers()
      this.isDelProject = false
      this._eventEmitterService.getAllProjectInAdmin()
      this.toastr.success(`Successfully deleted the project name ${this.data[0].projectName}`)
    },(err)=>{
      this.toastr.warning("An Error Occurred!")
    })
  }

  closeChangeNotification(){
    this.isChangeNotificationOpen= false
  }

  openChangeNotification(projectId:number){
    this.projectId = projectId
    this.isChangeNotificationOpen= true
    this.data = this.projects.filter((data:any)=>{
      if( data.id == projectId) return data
    })
    this.editProjectForm.controls.projectName.setValue(this.data[0].projectName)
  }


  closeDelProject(){
    this.isDelProject = false
  }

  
  commitEditProjectName(){
    this.isChangeSubmit = true
    if(this.editProjectForm.valid){
      this._editProjectSubscription = this._adminService.editProjectById(this.projectId,this.editProjectForm.value).subscribe(()=>{
        this.getAllProjects()
        this.getAllUsers()
        this.isChangeNotificationOpen = false
        this.isChangeSubmit = false
        this.editProjectForm.controls.projectName.setValue(this.data[0].projectName)
      },(err)=>{
        this.toastr.warning(err.error.detail)
        this.isChangeSubmit = false
        this.editProjectForm.controls.projectName.setValue(this.data[0].projectName)
      })
    }else{
      this.toastr.warning("Invalid Inputs!")
      this.isChangeSubmit = false
      this.editProjectForm.controls.projectName.setValue(this.data[0].projectName)
    }
  }

  ngOnDestroy(){
    this._getAllProjectSubscription.unsubscribe()
    this._deleteProjectSubscription.unsubscribe()
    this._getAllUserSubscriptions.unsubscribe()
    this._editProjectSubscription.unsubscribe()
  }

}
