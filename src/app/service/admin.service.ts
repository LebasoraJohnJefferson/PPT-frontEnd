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


  getAdminDetails():Observable<any>{
    return this._http.get(`${this.baseURL}/admin`)
  }

  UpdateAdminDetails(file:File,form:any):Observable<string>{
    const formData = new FormData()
    if(file) formData.append("file", file, file.name);
    formData.append("form",JSON.stringify(form))
    return this._http.put<string>(`${this.baseURL}/admin`,formData)
  }


}
