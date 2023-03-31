import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseURL = environment.baseURL

  constructor(
    private _http:HttpClient
  ) { }

  getCredentials(credentials:any):Observable<any>{
    return this._http.post(`${this.baseURL}/admin`,credentials)
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


}
