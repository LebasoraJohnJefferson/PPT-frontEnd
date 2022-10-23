import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from 'src/app/service/event-emitter.service';

@Component({
  selector: 'app-button-aside-open',
  templateUrl: './button-aside-open.component.html',
  styleUrls: ['./button-aside-open.component.css']
})
export class ButtonAsideOpenComponent implements OnInit {

  constructor(
    private eventEmitterService:EventEmitterService
  ) { }

  ngOnInit(): void {
  }

  asideButton(){
    this.eventEmitterService.clickAside()
  }

}
