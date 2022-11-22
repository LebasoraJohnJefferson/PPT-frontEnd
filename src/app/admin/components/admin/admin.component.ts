import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AdminService } from 'src/app/service/admin.service';
import { Subscription } from 'rxjs';
import { EventEmitterService } from 'src/app/service/event-emitter.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  uploadFile:any
  onLoadFile:any
  isUpdateButton:boolean = false
  image:string='';
  defaultProfile = environment.default_profile
  hostingName = environment.baseURL
  firstFormGroup: FormGroup = this._formBuilder.group({
    email: ['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    password2:['',[Validators.required]]
  });

  secondFormGroup: FormGroup = this._formBuilder.group({
    image:[''],
    fullName: [''],
    address:['',],
    birthDay:[''],
    gender:['']
  });

  private _getAdminDetailsSubscription:Subscription = new Subscription()
  private _updateAdminSubscription:Subscription = new Subscription()
  

  constructor(
    private _formBuilder:FormBuilder,
    private toastr:ToastrService,
    private _adminService:AdminService,
    private _eventEmitterService:EventEmitterService
  ) { 
    this.getAdminDetails()
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._getAdminDetailsSubscription.unsubscribe()
    this._updateAdminSubscription.unsubscribe()
  }

  getAdminDetails(){
    this._getAdminDetailsSubscription = this._adminService.getAdminDetails().subscribe((res)=>{
      if(res.image){
        this.onLoadFile = this.hostingName+'/users/profiles/'+res.image
      }
      this.firstFormGroup.get('email')?.setValue(res.email)
      this.secondFormGroup.get('fullName')?.setValue(res.fullName)
      this.secondFormGroup.get('address')?.setValue(res.address)
      let setBDay = moment(res.birthDay).local().format('YYYY-MM-DD')
      this.secondFormGroup.get('birthDay')?.setValue(setBDay)
      this.secondFormGroup.get('gender')?.setValue(res.gender)
    })
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

  submitRegister(){
    if(this.firstFormGroup.valid && this.secondFormGroup.valid){
      this.isUpdateButton=true
      let bDay = moment.utc(new Date(this.secondFormGroup.get("birthDay")?.value))
      let bDayTemp = moment(bDay).local().format('YYYY-MM-DD 00:00:00');
      this.secondFormGroup.value.birthDay= bDayTemp
      let submitInfo = Object.assign({}, this.firstFormGroup.value, this.secondFormGroup.value);
      this._updateAdminSubscription = this._adminService.UpdateAdminDetails(this.uploadFile,submitInfo)
      .subscribe(()=>{
        this.getAdminDetails()
        this.toastr.success("Admin details successfully updated!")
        this.isUpdateButton=false
        this._eventEmitterService.changeAdminProfile()
      },(err)=>{
        this.isUpdateButton=false
        this.toastr.warning(err.error.detail)
      })
    }else{
      this.toastr.warning('Email and password are required!')
    }
  }

}
