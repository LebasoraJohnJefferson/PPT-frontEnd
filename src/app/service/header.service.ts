import { Injectable } from '@angular/core';
import { environment } from 'src/env';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetUser {
  baseURL:string = environment.baseURL
  constructor(
    private http:HttpClient
  ) { }

  getCurrentUser():Observable<any>{
    return this.http.get<any>(`${this.baseURL}/users`)
  }

}
