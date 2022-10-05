import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env';  
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class MessagesService{
  baseURL:string = environment.baseURL
  private seenMessageEmitter =new Subject<any>()
  changeSeenMessageEmitter$ = this.seenMessageEmitter.asObservable()
  constructor(
    private http:HttpClient,
    ){
      
    }
  
  emitSeenMessage(){
    this.seenMessageEmitter.next()
  }
  
  getMessages(user_id:any):Observable<any>{
    return this.http.get<any>(`${this.baseURL}/messages/${user_id}`)
  }

  updateMessage(email:any):Observable<any>{
    return this.http.put<any>(`${this.baseURL}/messages/notify/${email}`,'')
  }

  getMessageNotify():Observable<any>{
    return this.http.get<any>(`${this.baseURL}/messages/notify`)
  }

  sendMessages(user_id:any,message:string):Observable<any>{
    return this.http.post<any>(`${this.baseURL}/messages/${user_id}`,message)
  }
}
