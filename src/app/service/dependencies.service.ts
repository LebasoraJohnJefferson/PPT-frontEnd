import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DependenciesService {
  baseURL = environment.baseURL
  constructor(
    private _http:HttpClient
  ) { }

  getAllDependenciesByProjectId(project_id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/dependencies/get_by_project_id/${project_id}`)
  }

}
