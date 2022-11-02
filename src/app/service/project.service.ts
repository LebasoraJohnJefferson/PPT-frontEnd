import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseURL= environment.baseURL
  constructor(
    private _http:HttpClient
  ) { }


  retrieveAllInfoManager():Observable<any>{
    return this._http.get(`${this.baseURL}/projects/retrieve_all_info_manager`,)
  }

  retrieveAllInfoCategory():Observable<any>{
    return this._http.get(`${this.baseURL}/projects/retrieve_all_info_team_member`,)
  }

  SaveProject(details:any):Observable<any>{
    return this._http.post(`${this.baseURL}/projects`,details)
  }

  getAllProjectDetails():Observable<any>{
    return this._http.get(`${this.baseURL}/projects`)
  }

  deleteProject(id:any):Observable<any>{
    return this._http.delete(`${this.baseURL}/projects/${id}`)
  }


}
