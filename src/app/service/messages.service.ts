import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env';  

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  baseURL:string = environment.baseURL
  constructor(private http:HttpClient) { }


  getMessages(user_id:any){
    return this.http.get(`${this.baseURL}/messages/${user_id}`)
  }
}
