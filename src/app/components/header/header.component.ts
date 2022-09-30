import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() OpenAside =  new EventEmitter()
  isNavBarOpen:boolean = true
  
  constructor(
    private router:Router,
    private toastr:ToastrService,
  ) { }

  ngOnInit(): void {
  }

  onClickAside(){
    this.OpenAside.emit()
    this.isNavBarOpen = !this.isNavBarOpen
  }



  
  
}
