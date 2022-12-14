import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  
  baseURL = environment.baseURL

  constructor(
    private _http:HttpClient
  ) { }

  getAllNotCollaborator(id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/collaborators/${id}`)
  }

  createCollaborator(id:any,data:any):Observable<any>{
    return this._http.post(`${this.baseURL}/collaborators/${id}`,data)
  }

  getAllProject():Observable<any>{
    return this._http.get(`${this.baseURL}/collaborators/`)
  }

  kickCollaborator(id:any):Observable<any>{
    return this._http.delete(`${this.baseURL}/collaborators/kick_collaborator/${id}`)
  }

  AllCollaboratorInTheProject(id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/collaborators/get_all_collaborator/${id}`)
  }

  rejectInvitationForCollaboration(id:any,action:any):Observable<any>{
    return this._http.delete(`${this.baseURL}/collaborators/${action}/${id}`)
  }

  acceptInvitationForCollaboration(id:any):Observable<any>{
    return this._http.put(`${this.baseURL}/collaborators/${id}`,'')
  }

  updateCollaboratorDetails(data:any):Observable<any>{
    return this._http.put(`${this.baseURL}/collaborators/updateCollaboratorDetails`,data)
  }


  getActivityAndCollaboratorDetails(project_id:any,data:any):Observable<any>{
    return this._http.post(`${this.baseURL}/collaborators/get_assign_member_by_id/${project_id}`,{'activityId':data})
  }

}
