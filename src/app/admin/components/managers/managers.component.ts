import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { MembersService } from 'src/app/service/members.service';
import { ManagersService } from 'src/app/service/managers.service';


@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
  isShowCreateManager:boolean = true
  isShowCategoryForm:boolean = false
  isDeleteManagerShow:boolean = false
  isDeleteCategoryShow:boolean = false
  isLoadingCategoryBtn:boolean = false
  isLoadingManagerBtn:boolean = false
  isDeleteBtnLoading:boolean = false
  isDeleteBtnLoading_category:boolean=false
  isLoadingCategoryAnimation:boolean=true
  isLoadingMangerAnimation:boolean=true
  projectManager:string = ''
  categoryName:string = ''
  members:any=[]
  available_members:any=[]
  categories:any = []
  managers:any = []
  managerId:number  = 0
  categoryId:number = 0
  selectEditTriggerById:number = 0
  selectEditTriggerByIdCategory:number = 0
  private _categoryGetAllSubscription:Subscription = new Subscription()
  private _managerGetAllSubscription:Subscription = new Subscription()
  private _allMemberSubscription:Subscription = new Subscription()
  private _managerPostSubscription:Subscription = new Subscription()
  private _managerUpdateSubscription:Subscription = new Subscription()
  private _managerDeleteSubscription:Subscription = new Subscription()
  private _categorySaveSubscription:Subscription = new Subscription()
  private _categoryDeleteSubscription:Subscription = new Subscription()
  private _categoryUpdateSubscription:Subscription = new Subscription()
  private _availableUser:Subscription = new Subscription()


  categoryFormGroup:FormGroup = this._formBuilder.group({
    fullName:['',Validators.required],
    description:['',Validators.required]
  })

  managerFormGroup:FormGroup = this._formBuilder.group({
    categoryId:['',Validators.required],
    managerId:['',Validators.required]
  })

  editCategory:FormGroup = this._formBuilder.group({
    fullName:['',Validators.required],
    description:['',Validators.required]
  })

  editProjectManager:FormGroup = this._formBuilder.group({
    categoryId:['',Validators.required],
    managerId:['',Validators.required],
    create:[null,Validators.required],
    read:[null,Validators.required],
    update:[null,Validators.required],
    delete:[null,Validators.required],
  })


  constructor(
    private _formBuilder:FormBuilder,
    private _toastr:ToastrService,
    private _categoryService:CategoryService,
    private _membersService:MembersService,
    private _managersService:ManagersService
  ) {
    this.getAllCategory()
    this.getAllMembers()
    this.getAllManager()
    this.getAllAvailableUser()
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this._categoryGetAllSubscription.unsubscribe()
    this._categorySaveSubscription.unsubscribe()
    this._allMemberSubscription.unsubscribe()
    this._managerPostSubscription.unsubscribe()
    this._managerGetAllSubscription.unsubscribe()
    this._managerUpdateSubscription.unsubscribe()
    this._managerDeleteSubscription.unsubscribe()
    this._categoryDeleteSubscription.unsubscribe()
    this._categoryUpdateSubscription.unsubscribe()
    this._availableUser.unsubscribe()
  }

  showCreateManager(){
    this.isShowCreateManager = true
    this.isShowCategoryForm = false
  }

  
  showCategoryForm(){
    this.isShowCategoryForm = true
    this.isShowCreateManager = false
  }

  getAllManager(){
    this._managerGetAllSubscription = this._managersService.allManager().subscribe(
      (res)=>{
        this.managers = res
        this.isLoadingMangerAnimation = false
      },()=>{
        this.isLoadingMangerAnimation = false
      }
    )
  }

  getAllAvailableUser(){
    this._availableUser = this._managersService.getAllUserThatNotMember().subscribe((res)=>{
      this.available_members = res
    })
  }

  getAllCategory(){
    this._categoryGetAllSubscription = this._categoryService.getCategories().subscribe((res)=>{
      this.categories = res
      this.isLoadingCategoryAnimation = false
    },()=>{
      this.isLoadingCategoryAnimation = false
    })
  }

  getAllMembers(){
    this._allMemberSubscription = this._membersService.getAllMembers().subscribe((res)=>{
      this.members = res
    })
  }

  submitCategory(){
    this.isLoadingCategoryAnimation = true
    this.isLoadingCategoryBtn = true
    if(this.categoryFormGroup.valid){
      this._categorySaveSubscription = this._categoryService.saveCategory(this.categoryFormGroup.value).subscribe((res)=>{
        this.getAllCategory()
        this._toastr.success("Category details successfully created!")
        this.isLoadingCategoryBtn  = false
        this.categoryFormGroup.reset()
      },(err)=>{
        this._toastr.warning(err.error.detail)
        this.isLoadingCategoryBtn  = false
        this.isLoadingCategoryAnimation = false
      })
    }else{
      this._toastr.warning("Pls.. make sure it fill all inputs")
      this.isLoadingCategoryAnimation = false
      this.isLoadingCategoryBtn = false
    }
  }

  submitManager(){
    this.isLoadingManagerBtn = true
    this.isLoadingMangerAnimation = true
    if(this.managerFormGroup.valid){
      this._managerPostSubscription = this._managersService.saveManager(this.managerFormGroup.value)
      .subscribe(()=>{
        this.getAllManager()
        this.isLoadingManagerBtn=false
        this.managerFormGroup.reset()
        this._toastr.success("Successfully created manager!")
      },(err)=>{ 
        this.isLoadingManagerBtn=false
        this.isLoadingMangerAnimation = false
        this._toastr.warning(err.error.detail)
      })
    }else{
      this.isLoadingManagerBtn=false
      this.isLoadingMangerAnimation = false
      this._toastr.warning("Pls.. make sure it fill all inputs")
    }
  }

  deleteManager(id:number,fullName:string){
    this.isDeleteManagerShow = !this.isDeleteManagerShow
    this.projectManager = fullName
    this.managerId = id
  }

  closeNotification(){
    this.isDeleteManagerShow = !this.isDeleteManagerShow
  }

  deleteManagerCommit(){
    this.isDeleteBtnLoading=true
    this.isLoadingMangerAnimation = true
    this._managerDeleteSubscription = this._managersService.deleteManager(this.managerId)
    .subscribe(()=>{
      this.isDeleteBtnLoading=false
      this._toastr.success(`successfully remove ${this.projectManager}`)
      this.getAllManager()
      this.isDeleteManagerShow = false
    },(err)=>{
      this.isDeleteBtnLoading=false
      this._toastr.warning(err.error.detail)
    })
  }

  deleteCategory(id:number,categoryName:string){
    this.isDeleteCategoryShow = true
    this.categoryName = categoryName
    this.categoryId = id
  }
  
  
  deleteCategoryCommit(){
    this.isLoadingCategoryAnimation = true
    this.isDeleteBtnLoading_category = true
    this._categoryDeleteSubscription = this._categoryService.deleteCategory(this.categoryId).subscribe(()=>{
      this.getAllCategory()
      this.getAllManager()
      this._toastr.success(`Successfully remove ${this.categoryName}`)
      this.isDeleteCategoryShow = false
      this.isDeleteBtnLoading_category = false
    },(err)=>{
      this.isDeleteCategoryShow = false
      this._toastr.warning(err.error.detail)
      this.isDeleteBtnLoading_category = false
    })
  }

  closeNotificationCategory(){
    this.isDeleteCategoryShow = false
  }


  async editFormShow(id:number){
    await this.managers.forEach((data:any)=>{
      if(data.id == id){
        this.editProjectManager.get("managerId")?.setValue(data.managerDetails.id)
        this.editProjectManager.get("categoryId")?.setValue(data.categoryDetails.id)
        this.editProjectManager.get("create")?.setValue(data.create)
        this.editProjectManager.get("read")?.setValue(data.read)
        this.editProjectManager.get("update")?.setValue(data.update)
        this.editProjectManager.get("delete")?.setValue(data.delete)
      }
    })
    this.selectEditTriggerById = id
  }

  cancelEditManger(){
    this.selectEditTriggerById=0
  }



  saveEditManager(){
    this.isLoadingMangerAnimation=true
    if(this.editProjectManager.valid){
      this._managerUpdateSubscription=this._managersService.updateManager(this.selectEditTriggerById,this.editProjectManager.value).subscribe(()=>{
        this._toastr.success("Successfully Updated!")
        this.getAllManager()
      },(err)=>{
        if(err.status == 422) this._toastr.warning(err.error.detail[0].msg)
        else{
          this._toastr.warning(err.error.detail)
        }
      })
      this.selectEditTriggerById = 0
    }
  }

  async editFormShowCategory(id:number){
    await this.categories.forEach((data:any)=>{
      if(data.id == id){
        this.editCategory.get("fullName")?.setValue(data.fullName)
        this.editCategory.get("description")?.setValue(data.description)
      }
    })
    this.selectEditTriggerByIdCategory = id
  }

  
  cancelEditCategory(){
    this.selectEditTriggerByIdCategory = 0
  }
  
  saveEditCategory(){
    this.isLoadingCategoryAnimation=true
    if(this.editCategory.valid){
      this._categoryUpdateSubscription = this._categoryService.updateCategory(this.selectEditTriggerByIdCategory,this.editCategory.value).subscribe(()=>{
        this._toastr.success("Successfully Updated")
        this.getAllCategory()
      },(err)=>{
        if(err.status == 422) this._toastr.warning(err.error.detail[0].msg)
        else{
          this._toastr.warning(err.error.detail)
        }
      })
    }else{
      this._toastr.warning("Invalid Inputs")
    }
    this.selectEditTriggerByIdCategory = 0
  }

  


}
