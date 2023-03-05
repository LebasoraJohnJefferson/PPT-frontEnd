import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { ActivatedRoute  } from '@angular/router'
import { ActivitiesService } from 'src/app/service/activities.service';
import { environment } from 'src/environments/environment';
import { JobsService } from 'src/app/service/jobs.service';
import { CollaboratorService } from 'src/app/service/collaborator.service';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-information-technology',
  templateUrl: './information-technology.component.html',
  styleUrls: ['./information-technology.component.css']
})
export class InformationTechnologyComponent implements OnInit {
  @Input() data:any;
  @Output() deleteBtn:EventEmitter<any> = new EventEmitter()
  @Output() changeData:EventEmitter<any> = new EventEmitter()
  @Output() openFeedBackForm:EventEmitter<any> = new EventEmitter()
  projectID:any = this._routes.snapshot.paramMap.get('id')
  private _changeActivityStageSubscription:Subscription = new Subscription()
  collaborators:any = []
  activityId:any=0
  activityIdClickToAssignMember:number = -1
  requirements:any=[]
  designs:any=[]
  showOptionById:number = -1
  implementations:any=[]
  verifications:any=[]
  maintenance:any=[]
  activityDetails:any=[]
  activityDependencies:any=[]
  isShowAssignMember:boolean = false
  isEditActivityOpen:boolean=false
  defaultImage:string = environment.default_profile

  editActivity:FormGroup = this._formBuilder.group({
    activityName:['',Validators.required],
    budget:[0,Validators.required],
    kickOff:['',Validators.required],
    dueDate:['',Validators.required],
    dependencies:[[]],
    descriptions:['',Validators.required]
  })

  private _getAllCollaboratorSubscription:Subscription = new Subscription()
  private _updateSubTaskSubscription:Subscription = new Subscription()
  private _assignOrUpdateCollaboratorToTheActivity:Subscription = new Subscription()
  private _updateActivityByIdSubscription:Subscription = new Subscription()


  constructor(
    private _routes:ActivatedRoute,
    private _activitiesService:ActivitiesService,
    private _collaboratorService:CollaboratorService,
    private _jobsService:JobsService,
    private _toastr:ToastrService,
    private _formBuilder:FormBuilder
  ) {
  }
  
  ngOnInit(): void {
  }

  
  ngOnChanges(){
    this.dataForEachTable()
  }

  getAllMembers(){
    this._getAllCollaboratorSubscription = this._collaboratorService.AllCollaboratorInTheProject(this.projectID)
    .subscribe((res)=>{
      this.collaborators = res
    })
  }

  dataForEachTable(){
    this.getAllMembers()
    let temp_req:any = []
    let temp_design:any = []
    let temp_implement:any = []
    let temp_verify:any = []
    let temp_maintain:any = []
    this.data.forEach((info:any)=>{
      if(info.Activity.stage == 'requirements'){
        temp_req.push(info)
      }else if(info.Activity.stage == 'designs'){
        temp_design.push(info)
      }else if (info.Activity.stage == 'implementations'){
        temp_implement.push(info)
      }else if (info.Activity.stage == 'verifications'){
        temp_verify.push(info)
      }else{
        temp_maintain.push(info)
      }
    });
    this.requirements = temp_req
    this.designs = temp_design
    this.implementations =temp_implement
    this.verifications =temp_verify
    this.maintenance =temp_maintain
  }

  showAssignForm(activityID:any){
    this.isShowAssignMember = !this.isShowAssignMember
    this.getAllMembers()
    this.activityIdClickToAssignMember = this.activityIdClickToAssignMember == activityID ? -1 : activityID
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    if(event.container.id != event.previousContainer.id){
      let temp = event.container.id
      let taskDragId = event.item.data.id
      if(temp == "requirements"){
        this._changeActivityStageSubscription = this._activitiesService.updateActivitiesStage({stage:'requirements',id:taskDragId}).subscribe((res)=>{this.changeData.emit()},(err)=>{console.log(err.error.detail)})
      }else if(temp == "designs"){
        this._changeActivityStageSubscription = this._activitiesService.updateActivitiesStage({stage:'designs',id:taskDragId}).subscribe((res)=>{this.changeData.emit()},(err)=>{console.log(err.error.detail)})
      }else if(temp == "implementations"){
        this._changeActivityStageSubscription = this._activitiesService.updateActivitiesStage({stage:'implementations',id:taskDragId}).subscribe((res)=>{this.changeData.emit()},(err)=>{console.log(err.error.detail)})
      }else if(temp == "verifications"){
        this._changeActivityStageSubscription = this._activitiesService.updateActivitiesStage({stage:'verifications',id:taskDragId}).subscribe((res)=>{this.changeData.emit()},(err)=>{console.log(err.error.detail)})
      }else{
        this._changeActivityStageSubscription = this._activitiesService.updateActivitiesStage({stage:'maintenance',id:taskDragId}).subscribe((res)=>{this.changeData.emit()},(err)=>{console.log(err.error.detail)})
      }
    }
  }


  deleteActivity(id:any,name:any){
    this.deleteBtn.emit({id:id,name:name})
  }

  closeAssignMember(){
    this.activityIdClickToAssignMember = -1
  }

  assignActivity(id:any,actID:any){
    this._assignOrUpdateCollaboratorToTheActivity = this._jobsService.AssignCollaboratorToActivity(this._routes.snapshot.paramMap.get('id'),{collaboratorId:id,activityId:actID}).subscribe((res)=>{
      this.activityIdClickToAssignMember = -1
      this._toastr.success("Successfully updated!")
      this.changeData.emit()
    },(err)=>{
      this.activityIdClickToAssignMember = -1
      this._toastr.warning(err.error.detail)
    })
  }

  openOptions(number:number){
    this.showOptionById = this.showOptionById !=number ? number : -1
  }

  openFeedBack(activity_ud:any){
    this.openFeedBackForm.emit(activity_ud)
  }


  editActivityDetails(activityDetails:any){
    this.isEditActivityOpen = !this.isEditActivityOpen
    this.activityId = activityDetails.id
    this.activityDetails = activityDetails
    this._updateActivityByIdSubscription = this._activitiesService.getActivityDependencies(activityDetails.id).subscribe(
      (res)=>{
        this.activityDependencies = res.activityDependencies
        this.editActivity.controls.dependencies.setValue(res.depend)
        this.editActivity.controls.activityName.setValue(activityDetails.activityName)
        this.editActivity.controls.budget.setValue(activityDetails.budget)
        this.editActivity.controls.kickOff.setValue(activityDetails.kickOff)
        this.editActivity.controls.dueDate.setValue(activityDetails.dueDate)
        this.editActivity.controls.descriptions.setValue(activityDetails.descriptions)
      }
    )
  }

  closeEditForm(){
    this.isEditActivityOpen = false
  }

  submitEditActivity(){
    if(this.editActivity.valid && this.editActivity.value){
      this._updateSubTaskSubscription= this._activitiesService.updateActivitiesDetails(this.activityId,this.editActivity.value).subscribe((res)=>{
        this.changeData.emit()
        this._toastr.success('Successfully updated!')
        this.isEditActivityOpen = !this.isEditActivityOpen
      },(err)=>{
        this._toastr.warning(err.error.detail)
      })
    }else{
      this._toastr.warning('invalid input!')
    }
  }
  

  ngOnDestroy(){
    this._changeActivityStageSubscription.unsubscribe() 
    this._getAllCollaboratorSubscription.unsubscribe() 
    this._updateActivityByIdSubscription.unsubscribe() 
    this._updateSubTaskSubscription.unsubscribe() 
    this._assignOrUpdateCollaboratorToTheActivity.unsubscribe() 
  }

}
