import { Component, OnInit, Output,EventEmitter,Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ActivitiesService } from 'src/app/service/activities.service';
import { ActivatedRoute  } from '@angular/router'
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import moment from 'moment'

@Component({
  selector: 'app-create-activity-form',
  templateUrl: './create-activity-form.component.html',
  styleUrls: ['./create-activity-form.component.css']
})
export class CreateActivityFormComponent implements OnInit {

  format:string = 'YYYY-MM-DD HH:mm:ss'
  projectId:any;

  @Output() closeForm:EventEmitter<any> = new EventEmitter();
  private _getActivitiesSubscription:Subscription = new Subscription()
  private _createActivitiesSubscription:Subscription = new Subscription()
  
  today = moment(new Date()).format(this.format)
  createActivity:FormGroup = this._formBuilder.group({
    activityName:['',Validators.required],
    budget:[0,Validators.required],
    kickOff:[this.today,Validators.required],
    dueDate:[this.today,Validators.required],
    dependencies:[[]],
    descriptions:['',Validators.required]
  })
  @Input() activityDependencies:any = []



  constructor(
    private _activityService:ActivitiesService,
    private _routes:ActivatedRoute,
    private _formBuilder:FormBuilder,
    private _toastr:ToastrService
  ) { 
    this.projectId = this._routes.snapshot.paramMap.get('id');
    console.log(this.activityDependencies)
  }

  ngOnInit(): void {

  }

  toggle(){
    this.closeForm.emit()
  }


  submitActivity(){
    if(this.createActivity.get('budget')?.value <= 0 ){
      this._toastr.warning('budget must be greater than 0')
      return
    }
    if(this.createActivity.valid){
      this._createActivitiesSubscription = this._activityService.createActivities(this.projectId,this.createActivity.value)
      .subscribe((res)=>{
        this._toastr.success('Activity created successfully!')
        this.toggle()
        this.createActivity.reset()
      },(err)=>{
        this._toastr.warning(err.error.detail)
      })
    }else{
      this._toastr.warning('Make sure to full out all inputs!')
    }
  }

  ngOnDestroy() {
    this._getActivitiesSubscription.unsubscribe()
    this._createActivitiesSubscription.unsubscribe()
  }

}
