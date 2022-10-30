import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/service/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  isShowProjectForm:boolean = false
  managers:any = []
  members: any = [];

  private _retrieveAllInfoManagerSubscription:Subscription = new Subscription()
  private _retrieveAllInfoCategorySubscription:Subscription = new Subscription()
  private _SaveProjectSubscription:Subscription = new Subscription()


  projectFormGroup:FormGroup = this._formBuilder.group({
    projectName:['',Validators.required],
    budget:[0,Validators.required],
    kickOff:['',Validators.required],
    dueDate:['',Validators.required],
    teamMembers:[''],
    projectManager:['',Validators.required],
    description:['',Validators.required]
  })

  constructor(
    private _formBuilder:FormBuilder,
    private _toastr:ToastrService,
    private _projectService:ProjectService
  ) {
    this.getAllDetails()
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._retrieveAllInfoManagerSubscription.unsubscribe()
    this._retrieveAllInfoCategorySubscription.unsubscribe()
    this._SaveProjectSubscription.unsubscribe()
  }

  showProjectForm(){
    this.isShowProjectForm = !this.isShowProjectForm
  }

  getAllDetails(){
    this._retrieveAllInfoManagerSubscription = this._projectService.retrieveAllInfoManager()
    .subscribe((res)=>{
      this.managers=res
    })
    this._retrieveAllInfoCategorySubscription = this._projectService.retrieveAllInfoCategory()
    .subscribe((res)=>{
      this.members=res
      console.log(this.members)
    })
  }

  
  submitProject(){
    if(this.projectFormGroup.valid){
      this.projectFormGroup.value.kickOff= new Date(this.projectFormGroup.get("kickOff")?.value)
      this.projectFormGroup.value.dueDate= new Date(this.projectFormGroup.get("dueDate")?.value)
      this._SaveProjectSubscription = this._projectService.SaveProject(this.projectFormGroup.value).subscribe(()=>{
        this._toastr.success("Project successfully created!")
        this.isShowProjectForm = false
      },(err)=>{
        if(err.error.detail) this._toastr.warning(err.error.detail)
        else this._toastr.warning(err.error.detail.msg)
      })
    }else{
      this._toastr.warning("Invalid Inputs")
    }
  }

}
