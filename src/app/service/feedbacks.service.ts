import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {
 
  baseURL = environment.baseURL

  constructor(
    private _http:HttpClient
  ) { }

  getAllFeedBack(id:any):Observable<any>{
    return this._http.get(`${this.baseURL}/feedbacks/${id}`)
  }

  createFeedBack(data:any):Observable<any>{
    return this._http.post(`${this.baseURL}/feedbacks/`,data)
  }
}
