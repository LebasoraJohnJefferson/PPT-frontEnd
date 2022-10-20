import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  baseURL = environment.baseURL
  constructor(
    private _http:HttpClient
  ) { }


  saveCategory(category_details:any):Observable<any>{
    return this._http.post(`${this.baseURL}/categories`,category_details)
  }

  getCategories():Observable<any>{
    return this._http.get(`${this.baseURL}/categories`)
  }

}
