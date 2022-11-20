import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  baseURL = environment.baseURL
  constructor(
    private _http:HttpClient
  ) { }

  searchData(data:any):Observable<any>{
    return this._http.get(`${this.baseURL}/search/${data}`)
  }


}
