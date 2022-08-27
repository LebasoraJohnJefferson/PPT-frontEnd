import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env';  
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessagesService{
  baseURL:string = environment.baseURL
 
  constructor(
    private http:HttpClient,
    ){
      
    }
  
  getMessages(user_id:any):Observable<any>{
    return this.http.get<any>(`${this.baseURL}/messages/${user_id}`)
  }

  sendMessages(user_id:any,message:string):Observable<any>{
    return this.http.post<any>(`${this.baseURL}/messages/${user_id}`,message)
  }
}
