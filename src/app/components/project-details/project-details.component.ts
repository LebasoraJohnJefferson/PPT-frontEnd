import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CollaboratorService } from 'src/app/service/collaborator.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute  } from '@angular/router'


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {

  @Output() changeDataBaseOnCollaboratorAction:EventEmitter<any> = new EventEmitter()
  name:string = ''
  collaborateId:number = 0
  isRemoveCollaborator:boolean = false
  defaultImage = environment.default_profile
  collaborators:any = []
  isCollaboratorUpdateExpertiseOpen:boolean = false
  private _getAllCollaboratorSubscription:Subscription = new Subscription()
  private _removalCollaboratorSubscription:Subscription = new Subscription()
  private _updateCollaboratorDetailsSubscription:Subscription = new Subscription()

  createCollaboratorDetails:FormGroup = this._formBuilder.group({
    expertise:['',Validators.required],
    id:[0,Validators.required]
  })

  constructor(
    private _collaboratorService:CollaboratorService,
    private _toastr:ToastrService,
    private _formBuilder:FormBuilder,
    private _routes:ActivatedRoute
  ) { 
    this.getAllCollaborator()
  }

  ngOnInit(): void {
  }

  openUpdateCollaborator(id:any,name:any,expertise:any){
    this.name = name
    this.createCollaboratorDetails.get('id')?.setValue(id)
    this.createCollaboratorDetails.get('expertise')?.setValue(expertise)
    this.isCollaboratorUpdateExpertiseOpen = true
  }

  commitUpdateCollaborator(){
    if(this.createCollaboratorDetails.valid){
      this._updateCollaboratorDetailsSubscription = this._collaboratorService.updateCollaboratorDetails(this.createCollaboratorDetails.value).subscribe(()=>{
        this._toastr.success('Successfully updated')
        this.closeUpdateCollaborator()
        this.getAllCollaborator()
        this.changeDataBaseOnCollaboratorAction.emit()
      },(err)=>{
        this._toastr.error(err.error.detail)
      })
    }else{
      this._toastr.warning("Make sure to full out all inputs!")
    }
  }

  closeUpdateCollaborator(){
    this.isCollaboratorUpdateExpertiseOpen = false
  }

  closeRemoveCollaboratorNotification(){
    this.isRemoveCollaborator = false
  }

  commitRemovalOfCollaborator(){
    this._removalCollaboratorSubscription = this._collaboratorService.kickCollaborator(this.collaborateId)
    .subscribe((res)=>{
      this._toastr.success(`Successfully remove ${this.name}`)
      this.closeRemoveCollaboratorNotification()
      this.getAllCollaborator()
      this.changeDataBaseOnCollaboratorAction.emit()
    },(err)=>{
      this._toastr.warning(err.error.detail)
    })
  }

  openRemoveCollaboratorNotification(id:any,name:any){
    this.isRemoveCollaborator = true
    this.name =name
    this.collaborateId = id
  }

  getAllCollaborator(){
    this._getAllCollaboratorSubscription = this._collaboratorService.AllCollaboratorInTheProject(this._routes.snapshot.paramMap.get('id'))
    .subscribe((res)=>{
      this.collaborators = res
      console.log(res)
    })
  }

  ngOnDestroy() {
    this._getAllCollaboratorSubscription.unsubscribe()
    this._removalCollaboratorSubscription.unsubscribe()
    this._updateCollaboratorDetailsSubscription.unsubscribe()
  }

}
