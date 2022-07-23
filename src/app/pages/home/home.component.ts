import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isJoin:boolean = false
  isLogin:boolean = true
  
  constructor() { }

  ngOnInit(): void {
  }

  openLogin(){
    this.isJoin = !this.isJoin
    this.isLogin = true
  }

  openRegister(){
    this.isLogin = !this.isLogin
  }

}
