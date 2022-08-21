import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';
import { environment } from 'src/env';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


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
  isNotConversion:boolean = false
  sendMessage = this.fb.group({
    message:[null,Validators.required]
  })

  constructor(
    private route:ActivatedRoute,
    private messageService:MessagesService,
    private fb:FormBuilder,
    private toastr:ToastrService
  ) { 
    this.getMessageDetails()
  }    

  ngOnInit(): void {
  }


  onSubmit(){
    if(this.sendMessage.valid && this.sendMessage.get('message')?.value.trim()){
      console.log(this.sendMessage.value)
      this.messageService.sendMessages(this.route.snapshot.params.friend_id,this.sendMessage.value)
      .subscribe((res)=>{
        this.getMessageDetails()
        this.sendMessage.reset()
      },(err)=>{
        this.toastr.error(err.error.detail)
      })
    }else{
      this.toastr.warning("Pls Say something!")
    }
  }



  getMessageDetails(){
    this.messageService.getMessages(this.route.snapshot.params.friend_id).subscribe((res)=>{
      this.messages = res.conversion
      this.nameOfUserGoingToMessage = res.friend.full_name ? res.friend.full_name : res.friend.email 
      this.profileImageOfUserGoingToMessage = res.friend.image ? `${this.domain}/users/profiles/${res.friend.image}` : this.image_default
      this.EmailOfUserGoingToMessage = res.friend.email
    },(err)=>{
      this.isNotConversion = true
      this.toastr.error(err.error.detail)
    })
  }
}
