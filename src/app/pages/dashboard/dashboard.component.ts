import { Component, OnInit   } from '@angular/core';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { UsersService } from 'src/app/service/users.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isCloseOrOpen:boolean = false
  private _identityCheck:Subscription = new Subscription()
  

  constructor(
    public eventEmitterService:EventEmitterService,
    private _userService:UsersService,
    private _router:Router,
  ){
    eventEmitterService.openCloseAside$.subscribe(()=>{
      this.isCloseOrOpen = !this.isCloseOrOpen
    })
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    this._identityCheck.unsubscribe()
  }

}
