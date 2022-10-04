import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env';  
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject'


@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  baseURL = environment.baseURL
  private emitConfirmRequest =new Subject<any>();
  changeConfirmRequest$ = this.emitConfirmRequest.asObservable();
  constructor(
    private http:HttpClient
  ) { }

  emitRequest(){
    this.emitConfirmRequest.next()
  }


  getAllFriend():Observable<any>{
    return this.http.get<any>(`${this.baseURL}/friends/`)
  }

  friendRequestStatus(email:string):Observable<any>{
    return this.http.get<any>(`${this.baseURL}/friends/status/${email}`)
  }

  sendFriendRequest(email:any,request:any):Observable<any>{
    return this.http.post(`${this.baseURL}/friends/${email}`,request)
  }

  getSearchFriend(email:string):Observable<any>{
    return this.http.get<any>(`${this.baseURL}/users/search/${email}`)
  }
  getFriendDetails(email:string):Observable<any>{
    return this.http.get<any>(`${this.baseURL}/friends/profile/${email}`)
  }

  cancelFriendRequest(id:any):Observable<any>{
    return this.http.delete<any>(`${this.baseURL}/friends/friend_request/${id}`)
  }

  updateFriendRequest(id:any):Observable<any>{
    return this.http.put<any>(`${this.baseURL}/friends/${id}`,"")
  }

  getAllFriendRequest():Observable<any>{
    return this.http.get<any>(`${this.baseURL}/friends/all_friend_request`)
  }

}
