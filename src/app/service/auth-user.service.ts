import { Injectable } from '@angular/core';
import { HttpClient, HttpParams , HttpHeaders } from '@angular/common/http';
import { Auth2 as AuthInterface2 , Auth as AuthInterface,ResponseToken } from '../interface/auth';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  getCurrentUser():Observable<any>{
    return this.http.get<any>(`${this.baseURL}/users`)
  }

  UpdateUser(file:File,form:any):Observable<string>{
    const formData = new FormData()
    if(file) formData.append("file", file, file.name);
    formData.append("form",JSON.stringify(form))
    return this.http.put<string>(`${this.baseURL}/users`,formData)
  }
}
