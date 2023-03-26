import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  
  constructor(
    public toastr:ToastrService,
    private router:Router
  ) { 
   
  }

  ngOnInit(): void {
  }

  logout(){
    this.toastr.success("Logout successfully")
    localStorage.removeItem("token")
    this.router.navigate(['/admin'])
  }

  
}
