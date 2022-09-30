import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectsService } from 'src/app/service/projects.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  listOfProjectCreated:any = []
  fakeArray = new Array(10)
  isCreateFormOpen:boolean = false
  isSubmit:boolean=false
  subscriptionOfProjectCreated = new Subscription()
  projectDetails = this.fb.group(
    {
      project_name:[null,Validators.required],
      project_description:[null,Validators.required],
      kick_off:[null,Validators.required],
      budget:[null,Validators.required]
    }
  )
  constructor(
    private fb:FormBuilder,
    private toastr:ToastrService,
    private projectService:ProjectsService
  ) {
    this.getAllCreatedProject()
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptionOfProjectCreated.unsubscribe();
  }

  getAllCreatedProject(){
    this.subscriptionOfProjectCreated = this.projectService.getAllProject().subscribe((res)=>{
      this.listOfProjectCreated = res
      console.log(res)
    },(err)=>{
      this.toastr.warning("OverView", "An Error Occurred!")
    })
  }

  createFormOpen(){
    this.isCreateFormOpen = !this.isCreateFormOpen
  }

  onSubmit(){
    if(this.projectDetails.valid){
      this.projectDetails.value.kick_off = new Date(this.projectDetails.get("kick_off")?.value)
      this.projectService.createProject(this.projectDetails.value).subscribe((res)=>{
        this.toastr.success("Successfully Created!")
        this.isCreateFormOpen = false
        this.getAllCreatedProject()
      },(err)=>{
        this.toastr.warning(err.error.detail)
      })
      this.projectDetails.reset()
    }else this.toastr.warning("Pls.. fill up all the inputs","Creating Project Denied!")
  }
}
