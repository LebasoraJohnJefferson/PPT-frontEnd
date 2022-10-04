import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/service/friends.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthUser } from 'src/app/service/auth-user.service';
import { environment } from 'src/env';
import { FormBuilder, Validators } from '@angular/forms';
import { FeedbacksService } from 'src/app/service/feedbacks.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  path:string = environment.default_profile
  baseUrl = environment.baseURL
  isUpdateOpen:boolean = false
  name:string=""
  status:string=""
  request_id:number = 0
  parameter_email:any=''
  isUserProfileIsOwner:boolean=false
  date_joined:any;
  currentUserEmail:string=""
  list_of_feedback:any=[];
  detailSubscription:Subscription = new Subscription();
  feedback_id:any = 0
  details:any={
    "User": {
      "email": "",
      "path": this.path,
      "image": "",
      "full_name": "",
      "address": "",
      "created_at": ""
    },
    "project_count": 0
  };
  content = this.fb.group({
    feedback_content:[null,Validators.required]
  })

  updateForm = this.fb.group({
    feedback_content:[null,Validators.required]
  })



  constructor(
    private friendService:FriendsService,
    private route:ActivatedRoute,
    private router:Router,
    private AU:AuthUser,
    private fb:FormBuilder,
    private feedbackService:FeedbacksService,
    private toastr:ToastrService,
  ) { 
    friendService.changeConfirmRequest$.subscribe(()=>{
      this.getStatus(this.parameter_email)
    })
  }

  ngOnDestroy() {
    this.detailSubscription.unsubscribe()
  }

  getFriend(parameters:any){
    this.detailSubscription = this.friendService.getFriendDetails(parameters.email).subscribe((res)=>{
      this.details = res
      this.name = this.details.User.full_name ? this.details.User.full_name : this.details.User.email
      this.date_joined = new Date(this.details.User.created_at).toLocaleDateString() 
    },(err)=>{
      this.router.navigate(['/dashboard'])
      this.toastr.warning(err.error.detail)
    })
  }

  onSubmit(){
    if(this.content.valid){
      this.feedbackService.createFeedBack(this.parameter_email,this.content.value).subscribe((res)=>{
        this.toastr.success("Feedback Added!")
        this.content.reset()
        this.getAllFeedBack(this.parameter_email)
      },(err)=>{
        this.toastr.warning(err.error.detail)
      })
    }else{
      this.toastr.warning("Empty Input")
    }
  }

  sendFriendRequest(){
    this.friendService.sendFriendRequest(this.parameter_email,{}).subscribe((res)=>{
      this.getStatus(this.parameter_email)
      this.toastr.success("Friend Request Sent")
    },(err)=>{
    })
  }

  confirmFriendRequest(){
    this.friendService.updateFriendRequest(this.request_id).subscribe(()=>{
      this.friendService.emitRequest()
    },(err)=>{
      console.log(err)
    })
  }

  
  onSubmitUpdate(){
    if(this.updateForm.valid){
      this.feedbackService.updateFeedBack(this.feedback_id,this.updateForm.value).subscribe((res)=>{
        this.getAllFeedBack(this.parameter_email)
        this.updateForm.reset()
        this.toastr.success("Successfully Update!")
        this.closeUpdateForm()
      },(err)=>{
        this.toastr.warning(err.error.detail)
      })
    }else{
      this.toastr.warning("Empty Input")
    }
  }

  cancelFriendRequest(id:number){
    this.friendService.cancelFriendRequest(id).subscribe(()=>{
      this.toastr.success("Successfully cancel friend request")
      this.getStatus(this.parameter_email)
    },(err)=>{
      console.log(err)
    })
  }

  getAllFeedBack(email:any){
    this.feedbackService.getAllFeedBack(email).subscribe((res)=>{
      this.list_of_feedback = res
    },(err)=>{
      console.log(err)
    })
  }

  openUpdateForm(id:any){
    this.feedback_id = id
    this.isUpdateOpen =true
  }

  closeUpdateForm(){
    this.isUpdateOpen =false
  }

  onDelete(feedbackID:any){
    this.feedbackService.deleteFeedBack(feedbackID).subscribe((res)=>{
      this.getAllFeedBack(this.parameter_email)
      this.toastr.success("Successfully deleted")
    },(err)=>{
      this.toastr.warning(err.error.detail)
    })
  }

  getStatus(email:string){
    this.friendService.friendRequestStatus(email).subscribe((res)=>{
      this.status = res.status
      this.request_id = res.id
    },(err)=>{
      console.log(err)
    })
  }


  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.closeUpdateForm()
        this.getFriend(params)
        this.AU.getCurrentUser().subscribe((res)=>{
          this.isUserProfileIsOwner = res.email == params.email ? true : false
          this.currentUserEmail = res.email
          this.parameter_email = params.email
          this.getAllFeedBack(this.parameter_email) 
          this.getStatus(this.parameter_email)  
        },(err)=>{
          console.log(err)
        })
      }
  );
  }
  

}
