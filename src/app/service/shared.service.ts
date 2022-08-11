import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  buttonClick = new Subject()
  constructor() { }

  getButtonClick(){
    return this.buttonClick.asObservable()
  }
}
