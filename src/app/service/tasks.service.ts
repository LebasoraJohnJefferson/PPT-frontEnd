import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseURL= environment.baseURL
  constructor(
    private _http:HttpClient
  ) { }

  AddTask(id:any,taskDetails:any):Observable<any>{
    return this._http.post(`${this.baseURL}/tasks/${id}`,taskDetails)
  }

  getAllTask(id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/tasks/${id}`)
  }

  deleteTaskById(id:any):Observable<any>{
    return this._http.delete(`${this.baseURL}/tasks/${id}`)
  }

}
