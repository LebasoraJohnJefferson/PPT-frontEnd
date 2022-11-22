import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  private openCloseAside =new Subject<any>()
  private _changeAdminProfile =new Subject<any>()
  openCloseAside$ = this.openCloseAside.asObservable()
  isAdminProfileChange$ = this._changeAdminProfile.asObservable()
  constructor() { }

  clickAside(){
    this.openCloseAside.next()
  }

  changeAdminProfile(){
    this._changeAdminProfile.next()
  }


}
