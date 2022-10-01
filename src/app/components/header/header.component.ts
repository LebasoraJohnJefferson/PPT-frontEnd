import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { FriendsService } from 'src/app/service/friends.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() OpenAside =  new EventEmitter()
  isNavBarOpen:boolean = true
  path:string = "./assets/images/profile_thumb.png"
  showSearchInput:boolean = false
  userSearch:any=[]
  searchUser = this.fb.group({
    email:[null,Validators.required]
  })
  
  constructor(
    private router:Router,
    private toastr:ToastrService,
    private fb:FormBuilder,
    private friendService:FriendsService
  ) { }

  ngOnInit(): void {
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

  close(){
    this.showSearchInput =false
  }

  searchFriend(){
    this.showSearchInput = !this.showSearchInput
  }

  onClickAside(){
    this.OpenAside.emit()
    this.isNavBarOpen = !this.isNavBarOpen
  }



  
  
}
