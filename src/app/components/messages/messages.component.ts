import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';
import { environment } from 'src/env';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from 'src/app/service/socket.service';
import { AuthUser } from 'src/app/service/auth-user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages:any = []
  domain:string = environment.baseURL
  image_default:string = environment.default_profile
  todayDate : Date = new Date();
  nameOfUserGoingToMessage:string =''
  profileImageOfUserGoingToMessage:string =''
  EmailOfUserGoingToMessage:string =''
  status:any;
  getUser: Subscription = new Subscription()
  msg: Subscription = new Subscription()
  isFriendOnline: Subscription = new Subscription()
  sendMessage = this.fb.group({
    message:[null,Validators.required]
  })

  constructor(
    private route:ActivatedRoute,
    private messageService:MessagesService,
    private fb:FormBuilder,
    private toastr:ToastrService,
    private sockets:SocketService,
    private authUser:AuthUser,
    private router:Router,
  ) {
    // enter users own room
    this.getUser = this.authUser.getCurrentUser().subscribe(res=>{
      this.sockets.join('joinRoom',res.email)
    })
    //enter friend room
    this.sockets.join('joinRoom',this.route.snapshot.params.email)
    this.msg = this.sockets.messageNotify().subscribe(()=>{
      this.getMessageDetails()
    })
    this.isFriendOnline = this.sockets.friendStatus().subscribe((res)=>{
      this.status = res.status
    })
    }    

  ngOnInit(): void {
    
  }

  
  ngOnDestroy() {
    this.getUser.unsubscribe();
    this.msg.unsubscribe();
    this.isFriendOnline.unsubscribe()
  }


  onSubmit(){
    if(this.sendMessage.valid && this.sendMessage.get('message')?.value.trim()){
      this.messageService.sendMessages(this.route.snapshot.params.email,this.sendMessage.value)
      .subscribe((res)=>{
        this.sockets.join('joinRoom',this.EmailOfUserGoingToMessage)
        this.sendMessage.reset()
      },(err)=>{
        this.toastr.error(err.error.detail)
      })
    }else{
      this.toastr.warning("Pls Say something!")
    }
  }




  getMessageDetails(){
    this.sockets.join('isFriendOnline',this.route.snapshot.params.email)
    this.messageService.getMessages(this.route.snapshot.params.email)
    .subscribe((res)=>{
      this.messages = res.conversion
      this.nameOfUserGoingToMessage = res.friend.full_name ? res.friend.full_name : res.friend.email 
      this.profileImageOfUserGoingToMessage = res.friend.image ? `${this.domain}/users/profiles/${res.friend.image}` : this.image_default
      this.EmailOfUserGoingToMessage = res.friend.email
    },(err)=>{
      this.toastr.error(err.error.detail)
      this.router.navigate(['/dashboard'])
    })
  }
}
