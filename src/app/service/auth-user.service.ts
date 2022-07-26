import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';
import { environment } from 'src/env';
import { Auth as AuthInterface } from '../interface/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthUser {
  baseURL:string = environment.baseURL
  


  constructor(private http:HttpClient) { }

  RegisterUser(details:AuthInterface):Observable<any>{
    return this.http.post(`${this.baseURL}/users`,details)
  }

  LoginUser(details:AuthInterface):Observable<any>{
    return this.http.post(`${this.baseURL}/login`,details)
  }
}
