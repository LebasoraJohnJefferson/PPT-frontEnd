import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {
  
  baseURL = environment.baseURL

  constructor(
    private http:HttpClient
  ) { }

  createFeedBack(email:string,content:any):Observable<any>{
    return this.http.post<any>(`${this.baseURL}/feedbacks/${email}`,content)
  }

  getAllFeedBack(email:string):Observable<any>{
    return this.http.get<any>(`${this.baseURL}/feedbacks/${email}`)
  }

  deleteFeedBack(id:any):Observable<any>{
    return this.http.delete<any>(`${this.baseURL}/feedbacks/${id}`)
  }

  updateFeedBack(id:number,content:any):Observable<any>{
    return this.http.put<any>(`${this.baseURL}/feedbacks/${id}`,content)
  }
}
