import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  baseURL = environment.baseURL

  constructor(
    private _http:HttpClient
  ) { }

  getAllNotification():Observable<any>{
    return this._http.get(`${this.baseURL}/notifications/`)
  }

  seenAllNotification():Observable<any>{
    return this._http.put(`${this.baseURL}/notifications/`,'')
  }



}
