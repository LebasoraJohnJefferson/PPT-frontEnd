import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubTasksService {

  baseURL = environment.baseURL

  constructor(
    private _http:HttpClient
  ) { }

  createSubTask(data:any,activityId:any):Observable<any>{
    return this._http.post(`${this.baseURL}/subTasks/${activityId}`,data)
  }


  getAllSubTask(activity_id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/subTasks/${activity_id}`)
  }


}
