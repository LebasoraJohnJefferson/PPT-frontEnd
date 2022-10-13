import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  nav:string = 'dashboard';
  constructor(
    private router:Router,
    public toastr:ToastrService
  ) {

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
