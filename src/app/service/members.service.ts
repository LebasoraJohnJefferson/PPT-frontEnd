import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseURL= environment.baseURL
  constructor(
    private _http:HttpClient
  ) { }

  getAllMembers():Observable<any>{
    return this._http.get(`${this.baseURL}/members`)
  }

  getAllMembersByMemberID(id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/members/project_joined/${id}`)
  }

  deleteMembers(id:any):Observable<any>{
    return this._http.delete(`${this.baseURL}/members/${id}`)
  }

  acceptMembers(id:any):Observable<any>{
    return this._http.put(`${this.baseURL}/members/${id}`,null)
  }

  getOneMemberInfo(id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/members/${id}`)
  }


}
