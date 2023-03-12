import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CollaboratorUsersService {
  baseURL = environment.baseURL

  constructor(
    private _http:HttpClient
  ) { }

  checkCredentials(id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/collaboratorUsers/${id}`)
  }

  getActivity(activityId:any){
    return this._http.get(`${this.baseURL}/collaboratorUsers/dependencies/${activityId}`)
  }


  getProjectDetails(id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/collaboratorUsers/activities/${id}`)
  }


  project_manager_details(id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/collaboratorUsers/project_manager_details/${id}`)
  }
}
