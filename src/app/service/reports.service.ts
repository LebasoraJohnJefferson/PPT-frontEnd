import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  baseURL= environment.baseURL
  
  constructor(
    private _http:HttpClient
  ) { }

  getReports():Observable<any>{
    return this._http.get(`${this.baseURL}/reports/`, {responseType: 'blob'})
  }


}
