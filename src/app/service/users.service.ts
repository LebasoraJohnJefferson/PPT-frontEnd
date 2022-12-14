import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURL = environment.baseURL

  constructor(
    private _http:HttpClient
  ) { }

  updateUserDetails(file:File,form:any):Observable<any>{
    const formData = new FormData()
    if(file) formData.append("file", file, file.name);
    formData.append("form",JSON.stringify(form))
    return this._http.put<string>(`${this.baseURL}/users`,formData)
  }

  getUserDetails():Observable<any>{
    return this._http.get<any>(`${this.baseURL}/users`)
  }


  
}
