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

  RegisterUserByAdmin(details:any,file:File):Observable<any>{
    const formData = new FormData()
    if(file) formData.append("file", file, file.name);
    formData.append("form",JSON.stringify(details))
    return this._http.post(`${this.baseURL}/users/admin`,formData)
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

  UpdateUser(file:File,form:any):Observable<string>{
    const formData = new FormData()
    if(file) formData.append("file", file, file.name);
    formData.append("form",JSON.stringify(form))
    return this._http.put<string>(`${this.baseURL}/users`,formData)
  }
}
