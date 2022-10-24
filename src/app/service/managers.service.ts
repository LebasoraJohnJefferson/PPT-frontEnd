import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ManagersService {
  baseURL= environment.baseURL
  constructor(
    private _http:HttpClient
  ) { }


  saveManager(managers_details:any):Observable<any>{
    return this._http.post(`${this.baseURL}/managers`,managers_details)
  }

  allManager():Observable<any>{
    return this._http.get(`${this.baseURL}/managers`)
  }

  deleteManager(id:number):Observable<any>{
    return this._http.delete(`${this.baseURL}/managers/${id}`)
  }

}
