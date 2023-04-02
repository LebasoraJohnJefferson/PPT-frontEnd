import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Auth2 as AuthInterface2 , Auth as AuthInterface,ResponseToken } from '../interface/auth';
import { HttpClient, HttpParams , HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseURL = environment.baseURL

  constructor(
    private _http:HttpClient
  ) { }

  getCredentials(details:AuthInterface2):Observable<any>{
    const body = new HttpParams().set("username",details.username).set("password",details.password)
    return this._http.post<ResponseToken>(`${this.baseURL}/admin`,body.toString(),
      {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      }
    )
  }

  countDetails():Observable<any>{
    return this._http.get(`${this.baseURL}/admin`)
  }


  getAllUsers():Observable<any>{
    return this._http.get(`${this.baseURL}/admin/getAllUsers`)
  }


  deleteUserById(id:number):Observable<any>{
    return this._http.delete(`${this.baseURL}/admin/users/${id}`)
  }

  updateUserDetails(userId:any,file:File,form:any):Observable<any>{
    const formData = new FormData()
    if(file) formData.append("file", file, file.name);
    formData.append("form",JSON.stringify(form))
    return this._http.put<string>(`${this.baseURL}/admin/users/${userId}`,formData)
  }

  getAllProjects():Observable<any>{
    return this._http.get(`${this.baseURL}/admin/projects`)
  }

  deleteProjectById(id:number):Observable<any>{
    return this._http.delete(`${this.baseURL}/admin/projects/${id}`)
  }


  editProjectById(projectId:number,data:any):Observable<any>{
    return this._http.put(`${this.baseURL}/admin/projects/${projectId}`,data)
  }

  getAllFiles():Observable<any>{
    return this._http.get(`${this.baseURL}/admin/files`)
  }

  deleteFileById(id:number):Observable<any>{
    return this._http.delete(`${this.baseURL}/admin/files/${id}`)
  }


}
