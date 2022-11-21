import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  uploadFile:any
  onLoadFile:any
  defaultProfile = environment.default_profile
  firstFormGroup: FormGroup = this._formBuilder.group({
    email: ['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    password2:['',[Validators.required]]
  });

  secondFormGroup: FormGroup = this._formBuilder.group({
    image:[''],
    fullName: ['',[Validators.required]],
    address:['',[Validators.required]],
    birthDay:['',[Validators.required]],
    gender:['',[Validators.required]]
  });

  constructor(
    private _formBuilder:FormBuilder,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
  }

  onChange(event:any){
    if(event.target.files[0]){
      this.uploadFile = event.target.files[0]
    }
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
			this.onLoadFile = `${reader.result}` 
		}
  }

  imgProfileBtn(){
    let element: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    if (element) element.click();
  }

}
