import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/env';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  fakeArray = new Array(5)
  baseURL = environment.baseURL
  default_image = environment.default_profile
  @Input() email:String = ''
  @Input() path:String = ''
  @Input() name:String = ''
  @Input() listOfFriend:any
  imgSrc:String = ''
  constructor(
    private toastr:ToastrService,
    private router:Router
  ) { 
  }



  ngOnInit(): void {
  }

  
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/'])
    this.toastr.success("Logout Successfully")
  }
}
