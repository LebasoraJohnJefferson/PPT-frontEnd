import { Router,ActivatedRoute  } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-super-admin-aside',
  templateUrl: './super-admin-aside.component.html',
  styleUrls: ['./super-admin-aside.component.css']
})
export class SuperAdminAsideComponent implements OnInit {


  currentRoute: any;
  constructor(
    private router:Router,
    public toast:ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.currentRoute = this.route.snapshot.children[0].routeConfig?.path
  }


  getCurrentRouteURL(currentRoute:any) {
    this.currentRoute = currentRoute
  }


  
  logout(){
    this.toast.success("Logout successfully")
    localStorage.removeItem("token")
    this.router.navigate(['/admin/login'])
  }

}
