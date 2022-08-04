import { Component, OnInit   } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  content:String = 'Friends'
  fakeArray = new Array(10)
  email:string = ''
 
  constructor(
    private toastr:ToastrService
  ){

  }

  ngOnInit(): void {
  }


}
