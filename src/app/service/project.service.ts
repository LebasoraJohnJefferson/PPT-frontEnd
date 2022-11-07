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
  
  getProjectById(id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/projects/${id}`)
  }

  deleteProject(id:any):Observable<any>{
    return this._http.delete(`${this.baseURL}/projects/${id}`)
  }


  removalOfMember(id:any):Observable<any>{
    return this._http.delete(`${this.baseURL}/projects/removal_of_member/${id}`)
  }
  
  addMemberIntoTheProject(id:any,membersId:any):Observable<any>{
    return this._http.post(`${this.baseURL}/projects/add_member/${id}`,membersId)
  }

  
  getAllMemberByProjectId(id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/projects/get_all_member_by_project_id/${id}`)
  }
  
  getAllUserNotInProject(id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/projects/retrieve_all_info_team_member/${id}`)
  }

  changeProjectManagerByProjectId(id:any,details:any):Observable<any>{
    return this._http.put(`${this.baseURL}/projects/changeProjectManagerById/${id}`,details)
  }

  changeProjectCategoryByProjectId(id:any,details:any):Observable<any>{
    return this._http.put(`${this.baseURL}/projects/changeProjectCategoryById/${id}`,details)
  }

  projectDetailsUpdating(id:any,details:any):Observable<any>{
    return this._http.put(`${this.baseURL}/projects/${id}`,details)
  }

  

}
