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

  deleteOneTask(taskId:any):Observable<any>{
    return this._http.delete(`${this.baseURL}/subTasks/${taskId}`)
  }

  changeTaskStatus(taskId:any):Observable<any>{
    return this._http.put(`${this.baseURL}/subTasks/changeStatus/${taskId}`,'')
  }

  getDependencyById(taskID:number):Observable<any>{
    return this._http.get(`${this.baseURL}/subTasks/getDependencyById/${taskID}`)
  }

  updateTaskById(taskID:number,Details:any):Observable<any>{
    return this._http.put(`${this.baseURL}/subTasks/updateTaskById/${taskID}`,Details)
  }


}
