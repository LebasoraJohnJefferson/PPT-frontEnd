import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthUser as AuthBD } from 'src/app/service/auth-user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isJoin:boolean = false
  isLogin:boolean = true
  isPasswordMatch:boolean = false
  isShow:boolean =false
  isSubmitRegister:boolean =false
  isSubmit:boolean = false

  // validator of login 
  formLogin = this.fb.group({
    username:[null,[
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
    private toastr:ToastrService,
    private router:Router
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
    if(this.formLogin.valid){
      this.isSubmit = true
      this.authDB.LoginUser(this.formLogin.value)
      .subscribe((res)=>{
        this.toastr.success("Successfully Login")
        localStorage.setItem('token',res.access_token)
        this.router.navigate(['/dashboard'])
        this.isSubmit = false
      },(err)=>{
        if(err.status == 0) this.toastr.error('SERVER ERROR')
        else if (err.status == 403) this.toastr.warning(err.error.detail)
        else this.toastr.error('Unknown Error')
        this.isSubmit = false
      })
    }else{
      this.toastr.warning('Incorrect Email or Password')
    }
    this.formLogin.reset()
  }
  
  // get the data in register area
  onSubmitRegister(){
    if(this.formRegister.valid){
      if(this.formRegister.get('password')?.value == this.formRegister.get('confirmPassword')?.value){
        this.isSubmitRegister = true
        this.authDB.RegisterUser(
          this.formRegister.value
        ).subscribe(()=>{
            this.toastr.success('Successfully Register')
            this.isLogin = !this.isLogin
            this.isSubmitRegister=false
          },(err)=>{
            if(err.status == 0) this.toastr.error('SERVER ERROR')
            else if (err.status == 409) this.toastr.warning(err.error.detail)
            else this.toastr.error('Unknown Error')
            this.isSubmitRegister=false
          })
      }else{
        this.toastr.warning("Password and confirm password not matched")
      }
    }else{
      this.toastr.warning('Incorrect Email or Password')
    }
    this.formRegister.reset()
  }

  passwordMatch(){
    this.isPasswordMatch =  this.formRegister.get('password')?.value == this.formRegister.get('confirmPassword')?.value ? true : false
  }

  showPassword(){
    this.isShow = !this.isShow
  }

}
