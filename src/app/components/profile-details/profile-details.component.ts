import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/service/friends.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthUser } from 'src/app/service/auth-user.service';
import { environment } from 'src/env';



@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  path:string = environment.default_profile
  name:string=""
  isUserProfileIsOwner:boolean=false
  date_joined:any;
  detailSubscription:Subscription = new Subscription();
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
  constructor(
    private friendService:FriendsService,
    private route:ActivatedRoute,
    private router:Router,
    private AU:AuthUser
  ) { 
      
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
    })
  }


  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.getFriend(params)
        this.AU.getCurrentUser().subscribe((res)=>{
          this.isUserProfileIsOwner = res.email == params.email ? true : false
        },(err)=>{
          console.log(err)
        })
      }
  );
  }
  

}
