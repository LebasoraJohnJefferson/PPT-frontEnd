import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthUser as AuthBD } from 'src/app/service/auth-user.service';
import { ToastrService } from 'ngx-toastr';


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
    private authDB:AuthBD,
    private toastr:ToastrService
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
      if(this.formRegister.get('password')?.value == this.formRegister.get('confirmPassword')?.value){
        this.authDB.RegisterUser(
          this.formRegister.value
        ).subscribe(()=>{
            this.toastr.success('Successfully Register')
            this.isLogin = !this.isLogin
          },(err)=>{
            if(err.status == 0) this.toastr.error('SERVER ERROR','MAKE SURE YOUR SERVER IS UP!!')
            else if (err.status == 409) this.toastr.warning(err.error.detail)
            else this.toastr.error('Unknown Error')
          })
      }
    }else{
      this.toastr.warning('Invalid Information')
    }
    this.formRegister.reset()
  }

  passwordMatch(){
    this.isPasswordMatch =  this.formRegister.get('password')?.value == this.formRegister.get('confirmPassword')?.value ? true : false
  }

}
