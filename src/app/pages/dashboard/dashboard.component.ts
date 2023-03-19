import { Component, OnInit   } from '@angular/core';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { UsersService } from 'src/app/service/users.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


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
    public toastr:ToastrService
  ){
    eventEmitterService.openCloseAside$.subscribe(()=>{
      this.isCloseOrOpen = !this.isCloseOrOpen
    })
  }

  ngOnInit(): void {
    let roles = localStorage.getItem('roles')
    if(roles == 'USER'){
      this._router.navigate(['/users'])
      this.toastr.warning('Illegal Action!')
    }
      
  }

  ngOnDestroy() {
    this._identityCheck.unsubscribe()
  }

}
