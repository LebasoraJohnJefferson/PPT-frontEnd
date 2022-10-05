import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { FriendsService } from 'src/app/service/friends.service';
import { environment } from 'src/env';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() OpenAside =  new EventEmitter()
  @Output() ConfirmEventRequest =  new EventEmitter()
  baseURL:string = environment.baseURL
  isNavBarOpen:boolean = true
  requestDetails:any = []
  isNotifyDrawerOpen:boolean = false
  isMessageDrawerOpen:boolean = false
  path:string = environment.default_profile
  showSearchInput:boolean = false
  countMessageUnread:number = 0
  userSearch:any=[]
  searchUser = this.fb.group({
    email:[null,Validators.required]
  })
  messageDetailsInNotify:any;
  
  constructor(
    private toastr:ToastrService,
    private fb:FormBuilder,
    private messageService:MessagesService,
    private friendService:FriendsService
  ) {
    this.countMessage()
    friendService.changeConfirmRequest$.subscribe(()=>{
      this.getAllFriendRequestFromApi()
    })
    messageService.changeSeenMessageEmitter$.subscribe(()=>{
      this.countMessage()
    })
  }

  ngOnInit(): void {
    
  }


  countMessage(){
    this.getAllFriendRequestFromApi()
    let count = 0
    this.messageService.getMessageNotify().subscribe((res)=>{
      this.messageDetailsInNotify = res
      res.map((count_unread:any)=>{
        if(count_unread.is_seen == false && count_unread.you !=1) {
          count +=1
        }
      })
      this.countMessageUnread = count
    },(err)=>{
      console.log(err)
    })
  }


  onSubmit(){
    if(this.searchUser.valid){
      this.friendService.getSearchFriend(this.searchUser.value.email).subscribe((res)=>{
        this.userSearch = res
      },(err)=>{
        console.log(err)
      })
    }
  }

  getAllFriendRequestFromApi(){
    this.friendService.getAllFriendRequest().subscribe((res)=>{
      this.requestDetails =res
    },(err)=>{
      console.log(err)
    })
  }

  

  confirmFriendRequest(id:number){
    this.friendService.updateFriendRequest(id).subscribe(()=>{
      this.toastr.success("Successfully confirm friend request!")
      this.getAllFriendRequestFromApi()
      this.isNotifyDrawerOpen =false
      this.friendService.emitRequest()
      this.ConfirmEventRequest.emit()
    },(err)=>{
      console.log(err)
    })
  }

  close(){
    this.showSearchInput =false
  }

  searchFriend(){
    this.showSearchInput = !this.showSearchInput
    this.isNotifyDrawerOpen =false
    this.isMessageDrawerOpen=false
  }

  
  openMessageNotification(){
    this.isMessageDrawerOpen = !this.isMessageDrawerOpen
    this.isNotifyDrawerOpen =false
    this.showSearchInput = false
    this.countMessage()
  }

  
  OpenNotify(){
    this.isNotifyDrawerOpen = !this.isNotifyDrawerOpen
    this.showSearchInput = false
    this.isMessageDrawerOpen =false
  }

  onClickAside(){
    this.OpenAside.emit()
    this.showSearchInput = false
    this.isMessageDrawerOpen =false
    this.isNavBarOpen = !this.isNavBarOpen
  }

  cancelFriendRequest(id:number){
    this.friendService.cancelFriendRequest(id).subscribe(()=>{
      this.toastr.success("Successfully cancel friend request!")
      this.getAllFriendRequestFromApi()
      this.isNotifyDrawerOpen =false
    },(err)=>{
      console.log(err)
    })
  }




  
  
}
