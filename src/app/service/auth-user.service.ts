import { Injectable } from '@angular/core';
import { Auth2 as AuthInterface2 , Auth as AuthInterface,ResponseToken } from '../interface/auth';
import { HttpClient, HttpParams , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthUser {
  baseURL:string = environment.baseURL


  constructor(private _http:HttpClient) { }

  RegisterUser(details:AuthInterface):Observable<any>{
    return this._http.post(`${this.baseURL}/users`,details)
  }
  
  LoginUser(details:AuthInterface2):Observable<ResponseToken>{
    const body = new HttpParams().set("username",details.username).set("password",details.password)
    return this._http.post<ResponseToken>(`${this.baseURL}/login`,body.toString(),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }

  getCurrentUser():Observable<any>{
    return this._http.get<any>(`${this.baseURL}/users`)
  }

  forgotPassword(details:any){
    return this._http.post(`${this.baseURL}/forgotpassword`,details)
  }

  resetPassword(token:string,details:any){
    localStorage.setItem('token',token)
    return this._http.post(`${this.baseURL}/resetpassword`, details);
   }


}
