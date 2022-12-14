import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FeedbacksService } from 'src/app/service/feedbacks.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  @Output() feedBackToggle:EventEmitter<any> = new EventEmitter
  @Input() activityID:any;
  defaultImage:string = environment.default_profile
  feedBacks:any = []

  sendFeedBackForm:FormGroup = this._formBuilder.group({
    activityID:['',Validators.required],
    message:['',Validators.required]
  })
  private _getAllActivityFeedBackSubscription:Subscription = new Subscription()
  private _createActivityFeedBackSubscription:Subscription = new Subscription()

  constructor(
    private _formBuilder:FormBuilder,
    private _toastr:ToastrService,
    private _feedBackService:FeedbacksService
  ) { 
    
  }

  ngOnInit(): void {
    this.getAllActivityFeedBack()
  }

  sendFeedback(){
    this.sendFeedBackForm.get('activityID')?.setValue(this.activityID)
    if(this.sendFeedBackForm.valid){
      this._createActivityFeedBackSubscription = this._feedBackService.createFeedBack(this.sendFeedBackForm.value)
      .subscribe(()=>{
        this.getAllActivityFeedBack()
        this.sendFeedBackForm.reset()
      },(err)=>{
        this._toastr.warning(err.error.detail)
        this.sendFeedBackForm.reset()
      })
    }else{
      this._toastr.warning('Make sure to fill out all inputs!')
    }
  }

  getAllActivityFeedBack(){
    this._getAllActivityFeedBackSubscription = this._feedBackService.getAllFeedBack(this.activityID)
    .subscribe((res)=>{
      this.feedBacks = res
    })
  }

  close(){
    this.feedBackToggle.emit()
  }

  ngOnDestroy() {
    this._getAllActivityFeedBackSubscription.unsubscribe()
    this._createActivityFeedBackSubscription.unsubscribe()
  }

}
