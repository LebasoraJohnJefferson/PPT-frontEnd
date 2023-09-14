import { Component, OnInit,Input, EventEmitter,Output } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SubTasksService } from 'src/app/service/sub-tasks.service';

@Component({
  selector: 'app-update-and-create-task-form',
  templateUrl: './update-and-create-task-form.component.html',
  styleUrls: ['./update-and-create-task-form.component.css']
})
export class UpdateAndCreateTaskFormComponent implements OnInit {
  duration=0
  @Input() isCreateSubTaskFormOpen:boolean = false
  @Input() isEditSubTaskOpen:boolean = false
  @Input() activityId:number = -1
  taskId:number = -1
  @Input() tasks:any = []
  @Input() DataToBeEdited:any;

  @Output() isFormToggle:EventEmitter<any> = new EventEmitter()
  @Output() isFormToggleEdit:EventEmitter<any> = new EventEmitter()
  @Output() getAllTask:EventEmitter<any> = new EventEmitter()
  editTaskDependencyArray:any;
  isLoading:boolean = false
  isEditLoading:boolean = false
  
  private _updateTaskByIdSubscription:Subscription = new Subscription()
  private _createSubTaskSubscription:Subscription = new Subscription()

  createTask:FormGroup = this._formBuilder.group({
    taskName:['',Validators.required],
    duration:[0,Validators.required],
    dependency:[[]],
    descriptions:['',Validators.required]
  })

  editTask:FormGroup = this._formBuilder.group({
    taskName:['',Validators.required],
    duration:[0,Validators.required],
    dependency:[],
    descriptions:['',Validators.required]
  })

  constructor(
    private _formBuilder:FormBuilder,
    private _toastr:ToastrService,
    private _subTaskService:SubTasksService
  ) {
    
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(){
    if(this.isEditSubTaskOpen){
      console.log(this.DataToBeEdited.dependencies)
      this.editTask.controls.taskName.setValue(this.DataToBeEdited.taskName)
      this.editTask.controls.duration.setValue(this.DataToBeEdited.duration)
      this.editTask.controls.dependency.setValue(this.DataToBeEdited.dependAssigned)
      this.editTask.controls.descriptions.setValue(this.DataToBeEdited.descriptions)
      this.taskId = this.DataToBeEdited.taskID
    }
  }

  

  submitCreateTask(){
    if(this.createTask.controls.duration.value <= 0){
      this._toastr.warning('duration must be higher than 0!')
      return
    }
    this.isLoading = true
    if(this.createTask.valid){
      this._createSubTaskSubscription = this._subTaskService.createSubTask(this.createTask.value,this.activityId).subscribe(()=>{
        this._toastr.success("Successfully Created Task")
        this.getAllTask.emit()
        this.isFormToggle.emit()
        this.duration = 0
        this.isLoading = false
        this.createTask.reset()
      },(err)=>{
        this._toastr.warning(err.error.detail)
        this.isLoading = false
      })
    }else{
      this.isLoading = false
      this._toastr.warning('Make sure too fill out all inputs!')
    }
    
  }

  closeFormCreateTask(){
    this.isFormToggle.emit()
  }

  changeDuration(event:any){
    this.duration = event.value
  }

  closeEditForm(){
    this.isFormToggleEdit.emit()
  }

  

  submitEditTask(){
    if(this.editTask.valid){
      this.isEditLoading = true
      this._updateTaskByIdSubscription = this._subTaskService.updateTaskById(this.taskId,this.editTask.value).subscribe(()=>{
        this._toastr.success("Successfully Edited!")
        this.getAllTask.emit()
        this.closeEditForm()
        this.isEditLoading = false
      },(err)=>{
        this.isEditLoading = false
        this._toastr.warning(err.error.detail)
      })
    }else{
      this._toastr.warning("Invalid Input!")
    }
  }

  changeEditTaskDuration(event:any){
    this.DataToBeEdited.duration = event.value
  }

  ngOnDestroy(){
    this._createSubTaskSubscription.unsubscribe()
    this._updateTaskByIdSubscription.unsubscribe()
  }

}
