import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  fakeArray = new Array(5)
  @Input() email:String = ''
  @Input() path:String = ''
  imgSrc:String = ''
  constructor(
    private toastr:ToastrService,
    private router:Router
  ) { }


  ngOnInit(): void {
  }

  
  logout(){
    localStorage.removeItem('token')
    this.router.navigate(['/'])
    this.toastr.success("Logout Successfully")
  }
}
