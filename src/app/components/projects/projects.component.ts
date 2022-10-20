import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  isShowProjectForm:boolean = false
  isShowCategoryForm:boolean = true
  categories = ['mason','electrical']
  managers = ['John Doe', 'James Smith' , 'Maria Clara']
  members: string[] = ['Juan', 'Johnny', 'Pedro', 'JM', 'CM', 'CH'];

  categoryFormGroup:FormGroup = this._formBuilder.group({
    fullName:['',Validators.required],
    description:['',Validators.required]
  })

  constructor(
    private _formBuilder:FormBuilder,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
  }

  showProjectForm(){
    this.isShowProjectForm = !this.isShowProjectForm
    this.isShowCategoryForm = false
  }

  showCategoryForm(){
    this.isShowCategoryForm = !this.isShowCategoryForm
    this.isShowProjectForm = false
  }

  submitCategory(){
    console.log(this.categoryFormGroup.value)
  }

}
