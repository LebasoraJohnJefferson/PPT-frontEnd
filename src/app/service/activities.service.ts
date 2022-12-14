import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  baseURL = environment.baseURL

  constructor(
    private _http:HttpClient
  ) { }

  getAllActivities(id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/activities/${id}`)
  }

  createActivities(id:any,data:any):Observable<any>{
    return this._http.post(`${this.baseURL}/activities/${id}`,data)
  }

  deleteActivities(id:any):Observable<any>{
    return this._http.delete(`${this.baseURL}/activities/${id}`,)
  }

  updateActivitiesStage(data:any):Observable<any>{
    return this._http.put(`${this.baseURL}/activities/`,data)
  }
}
