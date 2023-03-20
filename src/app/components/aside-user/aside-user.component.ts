import { Component, OnInit,Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ActivatedRoute  } from '@angular/router'
import { CollaboratorService } from 'src/app/service/collaborator.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-aside-user',
  templateUrl: './aside-user.component.html',
  styleUrls: ['./aside-user.component.css']
})
export class AsideUserComponent implements OnInit {
  projectID:any;
  isSideBarOpen:boolean = true
  @Input() projectDetails:any=[];
  defaultImage:string =environment.default_profile

  private _deleteInvitationForCollaborationSubscription:Subscription = new Subscription()

  constructor(
    private _router:Router,
    private _routes:ActivatedRoute,
    private _collaborateService:CollaboratorService,
    public toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.projectID = this._routes.snapshot.paramMap.get('projectID')
    console.log(this.projectID)
  }

  leaveProject(){
    this._deleteInvitationForCollaborationSubscription = this._collaborateService.rejectInvitationUsingProjectID(this.projectID)
    .subscribe((res)=>{
      this.toastr.success('Successfully leave the project!')
      this._router.navigate(['/users'])
    },(err)=>{
      this.toastr.error(err.error.detail)
    })
  }

  

  toggleAside(){
    this.isSideBarOpen = !this.isSideBarOpen
  }

  ngOnDestroy() {
    this._deleteInvitationForCollaborationSubscription.unsubscribe()
  }

}
