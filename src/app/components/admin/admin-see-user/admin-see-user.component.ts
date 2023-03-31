import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/service/admin.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import * as moment from 'moment'

@Component({
  selector: 'app-admin-see-user',
  templateUrl: './admin-see-user.component.html',
  styleUrls: ['./admin-see-user.component.css']
})
export class AdminSeeUserComponent implements OnInit {

  defaultImage:string = environment.default_profile
  users:any=[]
  isUserDelFormOpen:boolean = false
  isEditUserInfoOpen:boolean = false
  UserId:number = -1
  UserName:string = ''
  uploadFile:any;
  isLoadingInEditUser:boolean = false

  editUserInfoDetails: FormGroup = this._formBuilder.group({
    email: ['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    image:[''],
    fullName: ['',[Validators.required]],
    address:['',[Validators.required]],
    birthDay:['',[Validators.required]],
    gender:['',[Validators.required]]
  });

  private _getAllUserSubscriptions:Subscription = new Subscription()
  private _deleteUserSubscriptions:Subscription = new Subscription()
  private _EditUserSubscriptions:Subscription = new Subscription()

  constructor(
    private _adminService:AdminService,
    public toastr:ToastrService,
    private _formBuilder:FormBuilder
  ) { 
    this.getAllUsers()
  }

  ngOnInit(): void {
  }

  getAllUsers(){
    this._getAllUserSubscriptions = this._adminService.getAllUsers().subscribe((res)=>{
      this.users = res
    })
  }
  

  deleteUserById(userId:number,userFullName:string){
    this.UserId = userId
    this.UserName = userFullName
    this.isUserDelFormOpen = true
  }

  closeDeleteUserNotification(){
    this.isUserDelFormOpen = false
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
      this.uploadFile = ''
			return;
		}
  }

  editUserInfo(user:any){
    this.UserId = user.id
    this.editUserInfoDetails.controls.fullName.setValue(user.fullName)
    this.editUserInfoDetails.controls.email.setValue(user.email)
    this.editUserInfoDetails.controls.gender.setValue(user.gender)
    const date =moment(user.birthDay).local().format('YYYY-MM-DD')
    this.editUserInfoDetails.controls.birthDay.setValue(date)
    this.editUserInfoDetails.controls.address.setValue(user.address)
    this.isEditUserInfoOpen = true
  }

  commitEditUserInfo(){
    this.isLoadingInEditUser=true
    if(this.editUserInfoDetails.valid){
      this._EditUserSubscriptions = this._adminService.updateUserDetails(this.UserId,this.uploadFile,this.editUserInfoDetails.value).subscribe(()=>{
        this.toastr.success("Successfully Updated!")
        this.closeEditUserInfo()
        this.isLoadingInEditUser = false
      },(err)=>{
        this.isLoadingInEditUser = false
        this.toastr.warning(err.error.detail)
      })
    }else{
      this.isLoadingInEditUser = false
      this.toastr.warning("Invalid Input(s)!")
    }
  }

  closeEditUserInfo(){
    this.isEditUserInfoOpen = false
  }

  commitDeleteUser(){
    this._deleteUserSubscriptions = this._adminService.deleteUserById(this.UserId).subscribe(()=>{
      this.getAllUsers()
      this.isUserDelFormOpen = false
      this.toastr.success(`User ${this.UserName} Successfully Deleted!`)
    },()=>{
      this.toastr.warning("An Error Occurred!")
    })
  }

  ngOnDestroy(){
    this._getAllUserSubscriptions.unsubscribe()
    this._deleteUserSubscriptions.unsubscribe()
    this._EditUserSubscriptions.unsubscribe()
  }

}
