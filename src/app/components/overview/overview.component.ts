import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectsService } from 'src/app/service/projects.service';
import { Subscription } from 'rxjs';
import { MembersService } from 'src/app/service/members.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  listOfProjectCreated:any = []
  Invite_project:any=[]
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
    private projectService:ProjectsService,
    private memberService:MembersService
  ) {
    this.getAllCreatedProject()
    this.allProjectInv()
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subscriptionOfProjectCreated.unsubscribe();
  }

  acceptInvitation(id:number){
    this.memberService.confirmInvitation(id).subscribe((res)=>{
      this.allProjectInv()
      this.toastr.success('User joined the project successfully!')
    },(err)=>{
      this.toastr.warning(err.error.details)
    })
  }
  
  cancelInvitation(id:number){
    this.memberService.deleteInvitation(id).subscribe((res)=>{
      this.allProjectInv()
      this.toastr.success('User decline the project invitation successfully!')
    },(err)=>{

    })
  }


  allProjectInv(){
      this.projectService.getAllProjectInvitation().subscribe((res)=>{
        this.Invite_project = res
        console.log(this.Invite_project)
      },(err)=>{
        console.log(err)
      })
  }

  getAllCreatedProject(){
    this.subscriptionOfProjectCreated = this.projectService.getAllProject().subscribe((res)=>{
      this.listOfProjectCreated = res
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
