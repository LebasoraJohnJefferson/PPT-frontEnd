import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthUser } from 'src/app/service/auth-user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  uploadFile:any;
  @Output() updateInfo =  new EventEmitter()
  isSubmitRegister=false;
  path:string = "./assets/images/profile_thumb.png"
  updateUserForm = this.fb.group({
    email:[null,[Validators.required,Validators.email]],
    newPassword:[null,Validators.required],
    oldPassword:[null,Validators.required],
    full_name:[null,Validators.nullValidator],
    address:[null,Validators.nullValidator],
    image:[null,Validators.nullValidator],
  })

  constructor(
    private fb:FormBuilder,
    private authUser:AuthUser,
    private toastr:ToastrService
  ) { 
    this.getUserData()
  }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.updateUserForm.valid){
      this.isSubmitRegister = true
      this.authUser.UpdateUser(this.uploadFile,this.updateUserForm.value).subscribe((res)=>{
        this.isSubmitRegister = false
        this.toastr.success("Successfully Updated")
        this.updateInfo.emit()
      },(err)=>{
        if(err.status == 0) this.toastr.error('SERVER ERROR')
        else if (err.status == 401) this.toastr.warning(err.error.detail)
        else if (err.status == 409) this.toastr.warning(err.error.detail)
        else if (err.status == 403) this.toastr.warning(err.error.detail)
        else this.toastr.error('Unknown Error')
        this.isSubmitRegister = false
      })
    }else{
      this.toastr.warning("required input is Empty")
    }
  }

  onChange(event:any){
    this.uploadFile = event.target.files[0]
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.toastr.warning('You must select an image');
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
      this.toastr.warning("Only images are supported")
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.path = `${reader.result}` 
		}
	}

  imgProfileBtn(){
    let element: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    if (element) element.click();
  }

  getUserData(){
    this.authUser.getCurrentUser()
    .subscribe((res)=>{
      this.updateUserForm.patchValue({
        email: res.email,
        address:res.address,
        full_name:res.full_name
      })
      this.path = res.path ? res.path : this.path
    },
      (err)=>{
        console.log(err)
    })
  }
}