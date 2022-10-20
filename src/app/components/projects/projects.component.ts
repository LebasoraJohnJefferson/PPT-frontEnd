import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  isShowProjectForm:boolean = false
  isLoadingCategoryBtn:boolean = false
  isShowCategoryForm:boolean = false
  categories:any = []
  managers:any = ['John Doe', 'James Smith' , 'Maria Clara']
  members: string[] = ['Juan', 'Johnny', 'Pedro', 'JM', 'CM', 'CH'];

  private _categorySaveSubscription:Subscription = new Subscription()
  private _categoryGetAllSubscription:Subscription = new Subscription()


  categoryFormGroup:FormGroup = this._formBuilder.group({
    fullName:['',Validators.required],
    description:['',Validators.required]
  })

  constructor(
    private _formBuilder:FormBuilder,
    private _toastr:ToastrService,
    private _categoryService:CategoryService
  ) {
    this.getAllCategory()
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._categorySaveSubscription.unsubscribe()
    this._categoryGetAllSubscription.unsubscribe()
  }

  showProjectForm(){
    this.isShowProjectForm = !this.isShowProjectForm
    this.isShowCategoryForm = false
  }

  showCategoryForm(){
    this.isShowCategoryForm = !this.isShowCategoryForm
    this.isShowProjectForm = false
  }

  getAllCategory(){
    this._categoryGetAllSubscription = this._categoryService.getCategories().subscribe((res)=>{
      this.categories = res
    },(err)=>{
      console.log(err)
    })
  }

  submitCategory(){
    this.isLoadingCategoryBtn = true
    if(this.categoryFormGroup.valid){
      this._categorySaveSubscription = this._categoryService.saveCategory(this.categoryFormGroup.value).subscribe((res)=>{
        this.getAllCategory()
        this._toastr.success("Category details successfully created!")
        this.isLoadingCategoryBtn  = false
      },(err)=>{
        this._toastr.warning(err.error.detail)
        this.isLoadingCategoryBtn  = false
      })
    }else{
      this.isLoadingCategoryBtn = false
    }
  }

}
