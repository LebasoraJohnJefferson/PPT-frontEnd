import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  nav:string = '/dashboard/overview';
  constructor(
    private router:Router,
    public toastr:ToastrService,
  ) {
      if(this.router.url == '/dashboard/overview' ||
        this.router.url == '/dashboard/projects' ||
        this.router.url == '/dashboard/timeline' ||
        this.router.url == '/dashboard/members' ||
        this.router.url == '/dashboard/managers' ||
        this.router.url == '/dashboard/reports' ||
        this.router.url == '/dashboard/notification' ||
        this.router.url == '/dashboard/admin'
      ){
        this.nav = this.router.url
      }
  }

  ngOnInit(): void {
  }

  AsideFocusPage(navigationName:string){
    this.nav = navigationName
  }

  logout(){
    this.toastr.success("Logout successfully")
    localStorage.removeItem("token")
    this.router.navigate(['/'])
  }

}
