import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/env';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  baseURL = environment.baseURL
  constructor(
    private http:HttpClient
  ) { }


  getAllFriend():Observable<any>{
    return this.http.get<any>(`${this.baseURL}/friends/`)
  }

  getSearchFriend(email:string):Observable<any>{
    return this.http.get<any>(`${this.baseURL}/users/search/${email}`)
  }
  getFriendDetails(email:string):Observable<any>{
    return this.http.get<any>(`${this.baseURL}/friends/profile/${email}`)
  }

}
