import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  private openCloseAside =new Subject<any>()
  openCloseAside$ = this.openCloseAside.asObservable()
  constructor() { }

  clickAside(){
    this.openCloseAside.next()
  }


}
