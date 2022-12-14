import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  baseURL = environment.baseURL

  constructor(
    private _http:HttpClient
  ) { }

  createProject(data:any):Observable<any>{
    return this._http.post(`${this.baseURL}/projects/`,data)
  }

  getAllProject():Observable<any>{
    return this._http.get(`${this.baseURL}/projects/`)
  }

  getProjectById(id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/projects/${id}`)
  }


  updateProjectName(id:any,data:any):Observable<any>{
    return this._http.put(`${this.baseURL}/projects/${id}`,data)
  }

}
