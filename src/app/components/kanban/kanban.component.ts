import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FriendsService } from 'src/app/service/friends.service';
import { environment } from 'src/env';
import { ActivatedRoute } from '@angular/router';
import { MembersService } from 'src/app/service/members.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  @Input() role:string = ''
  members:any = []
  searchMembers:any;
  isInvitationSearchOpen:boolean = false
  path:string = environment.default_profile
  baseUrl = environment.baseURL
  projectName:string = ''
  searchUser = this.fb.group({
    email:[null,Validators.required]
  })
  constructor(
    private fb:FormBuilder,
    private friendService:FriendsService,
    private route:ActivatedRoute,
    private membersService:MembersService,
    private toastr:ToastrService

  ){
  }
  


  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.projectName = params.projectName
        this.getAllMembers(this.projectName)
        }
    );
  }

  getAllMembers(projectName:any){
    this.membersService.getAllMember(projectName).subscribe((res)=>{
      this.members = res
      console.log(res)
    },(err)=>{
      console.log(err)
    })
  }

  openInvitationForm(){
    this.isInvitationSearchOpen = !this.isInvitationSearchOpen
  }

  removeMember(id:number){
    this.membersService.removeMember(id).subscribe((res)=>{
      this.getAllMembers(this.projectName)
      this.toastr.success('Successfully remove the User!')
    },(err)=>{
      this.toastr.warning(err.error.detail)
    })
  }

  sendInvitation(){
    if(this.searchUser.valid){
      this.friendService.getSearchFriend(this.searchUser.value.email).subscribe((res)=>{
         this.searchMembers = res
      },(err)=>{
      })
    }
  }

  sendRequestInvitation(email:string){
    this.membersService.sendInvitation(this.projectName,email).subscribe((res)=>{
      this.toastr.success("Invitation Sent!")
    },(err)=>{
      this.toastr.warning(err.error.detail)
    })
  }

}
