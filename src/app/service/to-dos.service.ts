import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToDosService {

  baseURL = environment.baseURL

  constructor(
    private _http:HttpClient
  ) { }

  createWork(data:any,subTaskID:any):Observable<any>{
    return this._http.post(`${this.baseURL}/toDos/${subTaskID}`,data)
  }

  getAllWork(subTaskID:any):Observable<any>{
    return this._http.get(`${this.baseURL}/toDos/${subTaskID}`)
  }
  
  updateStatus(toDosID:any,status:any):Observable<any>{
    return this._http.put(`${this.baseURL}/toDos/${toDosID}`,{'status':status})
  }
  
  deleteToDos(toDosID:any):Observable<any>{
    return this._http.delete(`${this.baseURL}/toDos/${toDosID}`)
  }
  
  updateWorkName(workName:any,toDosID:any):Observable<any>{
    return this._http.put(`${this.baseURL}/toDos/workName/${toDosID}`,workName)
  }
  
  uploadFiles(activityID:any,file:File,form:any):Observable<any>{
    const formData = new FormData()
    if(file) formData.append("file", file, file.name);
    formData.append("form",JSON.stringify(form))
    return this._http.post<string>(`${this.baseURL}/toDos/uploadFiles/${activityID}`,formData)
  }
  
  getAllUploadedFile(subTaskID:any):Observable<any>{
    return this._http.get(`${this.baseURL}/toDos/all_uploaded_task/${subTaskID}`)
  }

}
