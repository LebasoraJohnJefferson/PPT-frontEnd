import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders } from '@angular/common/http';
import { environment } from 'src/env';
import { Auth2 as AuthInterface2 , Auth as AuthInterface,ResponseToken } from '../interface/auth';
import { UserUpdate } from "../interface/user"
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
  
  LoginUser(details:AuthInterface2):Observable<ResponseToken>{
    const body = new HttpParams().set("username",details.username).set("password",details.password)
    return this.http.post<ResponseToken>(`${this.baseURL}/login`,body.toString(),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }

  UpdateUser(details:UserUpdate,res:any):Observable<any>{
    details.image = res
    return this.http.put(`${this.baseURL}/users`,details)
  }

  getCurrentUser():Observable<any>{
    return this.http.get<any>(`${this.baseURL}/users`)
  }

  uploadImage(file:File):Observable<string>{
    const formData = new FormData()
    formData.append("file", file, file.name);
    return this.http.post<string>(`${this.baseURL}/upload`,formData)
  }
}
