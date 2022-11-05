import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute,Router  } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  defaultProfilePicture:string = environment.default_profile
  members:any = []
  projectInfo:any = []
  age:any= 0
  birthDay:any = 0
  isSwitch:boolean = true
  private _projectInformation:Subscription = new Subscription()
  private _allJoinMembers:Subscription = new Subscription()
  constructor(
    private _projectService:ProjectService,
    private _routes:ActivatedRoute,
    private _router:Router,
    private _toastr:ToastrService,

  ) { 
    this.getAllInformationOfProject()
    this.getAllMembers()
  }

  ngOnDestroy(){
    this._projectInformation.unsubscribe()
    this._allJoinMembers.unsubscribe()
  }

  getAllInformationOfProject(){
    this._projectInformation = this._projectService.getProjectById(this._routes.snapshot.paramMap.get('id'))
    .subscribe((res)=>{
      this.projectInfo = res
      let timeDiff = Math.abs(Date.now() - new Date(this.projectInfo.Manager.managerDetails.birthDay).getTime())
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25)
      this.birthDay =new Date(this.projectInfo.Manager.managerDetails.birthDay)
    },()=>{
      this._toastr.warning("Project does`nt exist!")
      this._router.navigate(['/dashboard/projects'])
    })
  }

  getAllMembers(){
    this._allJoinMembers = this._projectService.getAllMemberByProjectId(this._routes.snapshot.paramMap.get('id')).subscribe((res)=>{
      this.members = res
      console.log(res)
    })
  }

  switch(nav:string){
    this.isSwitch = nav == 'Project' ? true : false
  }

  ngOnInit(): void {
  }

}
