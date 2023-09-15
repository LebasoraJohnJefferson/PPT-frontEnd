import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-outline',
  templateUrl: './admin-outline.component.html',
  styleUrls: ['./admin-outline.component.css']
})
export class AdminOutlineComponent implements OnInit {

  constructor(
    private _router:Router,
    public toastr:ToastrService
  ) { }

  ngOnInit(): void {
    let roles = localStorage.getItem('roles')
    if(roles == 'USER'){
      this._router.navigate(['/users'])
      this.toastr.warning('Illegal Action!')
    }else if (roles == 'MANAGER'){
      this._router.navigate(['/dashboard'])
      this.toastr.warning('Illegal Action!')
    }
  }

}
