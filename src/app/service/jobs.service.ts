import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class JobsService {

  baseURL = environment.baseURL

  constructor(
    private _http:HttpClient
  ) { }

  AssignCollaboratorToActivity(id:any,data:any):Observable<any>{
    return this._http.post(`${this.baseURL}/jobs/${id}`,data)
  }

}
