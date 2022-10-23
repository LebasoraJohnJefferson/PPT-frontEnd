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
  isLoadingCategoryBtn:boolean = false
  isLoadingManagerBtn:boolean = false
  isShowCategoryForm:boolean = false
  members:any=[]
  categories:any = []
  managers:any = []
  private _categoryGetAllSubscription:Subscription = new Subscription()
  private _managerGetAllSubscription:Subscription = new Subscription()
  private _categorySaveSubscription:Subscription = new Subscription()
  private _allMemberSubscription:Subscription = new Subscription()
  private _managerPostSubscription:Subscription = new Subscription()


  categoryFormGroup:FormGroup = this._formBuilder.group({
    fullName:['',Validators.required],
    description:['',Validators.required]
  })

  managerFormGroup:FormGroup = this._formBuilder.group({
    categoryId:['',Validators.required],
    managerId:['',Validators.required]
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
    },(err)=>{
      console.log(err)
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

  


}
