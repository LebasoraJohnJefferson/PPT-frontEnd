import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  baseURL = environment.baseURL
  constructor(
    private http:HttpClient,
  ) {
    
  }

  createTask(task:any):Observable<any>{
    return this.http.post<any>(`${this.baseURL}/tasks`,task)
  }

  // PERT
  getAllTask(task:any):Observable<any>{
    return this.http.get<any>(`${this.baseURL}/tasks/pert/${task}`)
  }

  getAllTaskDetails(project_name:any):Observable<any>{
    return this.http.get<any>(`${this.baseURL}/tasks/${project_name}`)
  }
  
  deleteTask(task_id:any):Observable<any>{
    return this.http.delete<any>(`${this.baseURL}/tasks/${task_id}`)
  }


}
