import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToDosService } from 'src/app/service/to-dos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-collaborator-work-station',
  templateUrl: './collaborator-work-station.component.html',
  styleUrls: ['./collaborator-work-station.component.css']
})
export class CollaboratorWorkStationComponent implements OnInit {
  isAddOpen:boolean = false
  works:any = []
  activityId:any = -1
  isDeleteNotificationOpen:boolean = false
  toDOsId:number = -1
  toDosIdToEdit:number = -1
  isUploadOpen:boolean = true

  private _updateWorkNameSubscription:Subscription = new Subscription()
  private _createWorkSubscription:Subscription = new Subscription()
  private _updateWorkSubscription:Subscription = new Subscription()
  private _deleteWorkSubscription:Subscription = new Subscription()
  private _getWorkSubscription:Subscription = new Subscription()


  createWork:FormGroup = this._formBuilder.group({
    workName:['',Validators.required],
    status:[false]
  })

  updateWorkName:FormGroup = this._formBuilder.group({
    workName:['',Validators.required],
  })
  
  constructor(
    private _formBuilder:FormBuilder,
    private _routes:ActivatedRoute,
    private _toDosService:ToDosService,
    private _toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.activityId = this._routes.snapshot.paramMap.get('activityID')
    if(this.activityId){
      this.getAllWork()
    }
  }


  updateStatus(toDosId:number,status:boolean){
    this._updateWorkSubscription = this._toDosService.updateStatus(toDosId,status).subscribe((res)=>{
      this.getAllWork()
    })
  }


  AddFormToggle(){
    this.isAddOpen = !this.isAddOpen
  }

  showToDosById(toDoId:number,name:string){
    this.updateWorkName.controls.workName.setValue(name)
    this.toDosIdToEdit = this.toDosIdToEdit == toDoId ? -1 : toDoId
  }

  getAllWork(){
    this._getWorkSubscription = this._toDosService.getAllWork(this.activityId).subscribe((res)=>{
      this.works = res
    })
  }

  openDelete(toDOsId:number){
    this.toDOsId = toDOsId
    this.isDeleteNotificationOpen = true
  }
  
  closeDeleteNotification(){
    this.isDeleteNotificationOpen = false
  }

  submitCreateWork(){
    if(this.createWork.valid){
      this._createWorkSubscription = this._toDosService.createWork(this.createWork.value,this.activityId).subscribe((res)=>{
        this._toastr.success("Successfully Created!")
        this.getAllWork()
        this.isAddOpen=false
        this.createWork.controls.workName.setValue('')
      },(err)=>{
        if(err.status ==409){
          this._toastr.warning(err.error.detail)
        }else{
          this._toastr.warning("Invalid Inputs")
        }
      })
    }else{
      this._toastr.warning("Invalid Inputs")
    }
  }

  submitUpdateWorkName(){
    if(this.updateWorkName.valid){
      this._updateWorkNameSubscription = this._toDosService.updateWorkName(this.updateWorkName.value,this.toDosIdToEdit).subscribe((res)=>{
        this.getAllWork()
        this._toastr.success("successfully change")
        this.toDosIdToEdit = -1
      },(err)=>{
        this._toastr.warning(err.error.detail)
      })
    }else{
      this._toastr.warning("Invalid Inputs")
    }
  }

  removeTodo(){
    this._deleteWorkSubscription = this._toDosService.deleteToDos(this.toDOsId).subscribe(()=>{
      this._toastr.success("Successfully removed")
      this.isDeleteNotificationOpen = false
      this.getAllWork()
    },()=>{
      this._toastr.error("An Error Occurred!")
    })
  }

  
OpenUpload(){
  this.isUploadOpen = true
}

closeUpload(){
  this.isUploadOpen = false
}


  ngOnDestroy(){
    this._createWorkSubscription.unsubscribe()
    this._getWorkSubscription.unsubscribe()
    this._updateWorkSubscription.unsubscribe()
    this._deleteWorkSubscription.unsubscribe()
    this._updateWorkNameSubscription.unsubscribe()
  }

}
