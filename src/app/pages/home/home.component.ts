import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthUser as AuthBD } from 'src/app/service/auth-user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isJoin:boolean = false
  isLogin:boolean = true
  isPasswordMatch:boolean = false

  // validator of login 
  formLogin = this.fb.group({
    email:[null,[
      Validators.required,
      Validators.email]],
      password:[null,Validators.required]
    })
    
  // validator of register
  formRegister = this.fb.group({
    email:[null,
      [Validators.required,Validators.email]
    ],
    password:[null,Validators.required],
    confirmPassword:[null,Validators.required]
  })


  
  constructor(
    private fb: FormBuilder,
    private authDB:AuthBD
    ) { }

  ngOnInit(): void {
  }

  // open the login form
  openLogin(){
    this.isJoin = !this.isJoin
    this.isLogin = true
  }

  // login shift into register form
  openRegister(){
    this.isLogin = !this.isLogin
  }
  
  // get the data in login area
  onSubmitLogin(){
    console.log(this.formLogin.valid)
    this.formLogin.reset()
  }
  
  // get the data in register area
  onSubmitRegister(){
    if(this.formRegister.valid){
      this.authDB.RegisterUser(
        this.formRegister.value
      ).subscribe((res)=>{
        if(res === null){
          alert('successfully created')
        }
      },(error)=>{
        console.log(error)
      })
    }

  }

  passwordMatch(){
    this.isPasswordMatch =  this.formRegister.get('password')?.value == this.formRegister.get('confirmPassword')?.value ? true : false
  }

}
