import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURL = environment.baseURL

  constructor(
    private _http:HttpClient
  ) { }

  getIdentity():Observable<any>{
    return this._http.get(`${this.baseURL}/users/identity`)
  }
}
