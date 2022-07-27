import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public jwtHelper:JwtHelperService,public router:Router) { }

  public isAuthenticated():boolean{
    const token = localStorage.getItem('token') || ''
    return !this.jwtHelper.isTokenExpired(token)
  }

  public getToken(){
    return localStorage.getItem('token') || ''
  }

}
