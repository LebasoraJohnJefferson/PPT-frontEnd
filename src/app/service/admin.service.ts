import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseURL = environment.baseURL

  constructor(
    private _http:HttpClient
  ) { }

  getCredentials(credentials:any):Observable<any>{
    return this._http.post(`${this.baseURL}/admin`,credentials)
  }
}
