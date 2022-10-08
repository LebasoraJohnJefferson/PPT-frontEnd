import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseURL = environment.baseURL

  constructor(
    private http:HttpClient
  ) { }

  sendInvitation(project_name:string,email:string):Observable<any>{
    return this.http.post<any>(`${this.baseURL}/members/${project_name}`,{'email':email})
  }

  confirmInvitation(id:number):Observable<any>{
    return this.http.put<any>(`${this.baseURL}/members/`,{"id":id})
  }

  deleteInvitation(id:number):Observable<any>{
    return this.http.delete<any>(`${this.baseURL}/members/${id}`)
  }

  getAllMember(project_name:any):Observable<any>{
    return this.http.get<any>(`${this.baseURL}/members/${project_name}`)
  }

  removeMember(id:number):Observable<any>{
    return this.http.delete<any>(`${this.baseURL}/members/remove_member/${id}`)
  }


}
