import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env';  
import { Observable } from 'rxjs';
import { projectInterFace } from '../interface/projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  baseURL = environment.baseURL
  constructor(
    private http:HttpClient
  ) { }

  createProject(details:projectInterFace){
    return this.http.post(`${this.baseURL}/projects/`,details)
  }

  getAllProject():Observable<any>{
    return this.http.get<any>(`${this.baseURL}/projects/`)
  }


}
