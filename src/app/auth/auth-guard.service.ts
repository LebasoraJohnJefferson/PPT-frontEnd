import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  
  constructor(public auth:AuthService, public router:Router , private toastr:ToastrService) { }

  canActivate():boolean{
    if(!this.auth.isAuthenticated()){
      this.router.navigate([''])
      this.toastr.warning('Login First')
      return false
    }
    return true
  }
}
