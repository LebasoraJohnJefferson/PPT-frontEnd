import { Component, OnInit   } from '@angular/core';
import { EventEmitterService } from 'src/app/service/event-emitter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isCloseOrOpen:boolean = true
  

  constructor(
    public eventEmitterService:EventEmitterService
    
  ){
    eventEmitterService.openCloseAside$.subscribe(()=>{
      this.isCloseOrOpen = !this.isCloseOrOpen
    })
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    
  }

}
