import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { of, Subscription } from 'rxjs';
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
  isDeleteManagerShow:boolean = false
  isLoadingCategoryBtn:boolean = false
  isLoadingManagerBtn:boolean = false
  isShowCategoryForm:boolean = false
  isDeleteBtnLoading:boolean = false
  projectManager:string = ''
  members:any=[]
  managerId:number  = 0
  selectEditTriggerById:number = 0
  categories:any = []
  managers:any = []
  private _categoryGetAllSubscription:Subscription = new Subscription()
  private _managerGetAllSubscription:Subscription = new Subscription()
  private _categorySaveSubscription:Subscription = new Subscription()
  private _allMemberSubscription:Subscription = new Subscription()
  private _managerPostSubscription:Subscription = new Subscription()
  private _managerUpdateSubscription:Subscription = new Subscription()


  categoryFormGroup:FormGroup = this._formBuilder.group({
    fullName:['',Validators.required],
    description:['',Validators.required]
  })

  managerFormGroup:FormGroup = this._formBuilder.group({
    categoryId:['',Validators.required],
    managerId:['',Validators.required]
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
      }
    )
  }

  getAllCategory(){
    this._categoryGetAllSubscription = this._categoryService.getCategories().subscribe((res)=>{
      this.categories = res
    })
  }

  getAllMembers(){
    this._allMemberSubscription = this._membersService.getAllMembers().subscribe((res)=>{
      this.members = res
    })
  }

  submitCategory(){
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
      })
    }else{
      this.isLoadingCategoryBtn = false
    }
  }

  submitManager(){
    this.isLoadingManagerBtn = true
    if(this.managerFormGroup.valid){
      this._managerPostSubscription = this._managersService.saveManager(this.managerFormGroup.value)
      .subscribe(()=>{
        this.getAllManager()
        this.isLoadingManagerBtn=false
        this.managerFormGroup.reset()
        this._toastr.success("Successfully created manager!")
      },(err)=>{ 
        this.isLoadingManagerBtn=false
        this._toastr.warning(err.error.detail)
      })
    }else{
      this.isLoadingManagerBtn=false
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
    this._managersService.deleteManager(this.managerId)
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

  saveEditManager(){
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

  


}
