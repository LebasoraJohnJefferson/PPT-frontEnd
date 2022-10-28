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
  isShowProjectForm:boolean = true
  managers:any = []
  categories:any=[]
  members: any = [];

  private _categorySaveSubscription:Subscription = new Subscription()


  projectFormGroup:FormGroup = this._formBuilder.group({
    projectName:['',Validators.required],
    budget:['',Validators.required],
    kickOff:['',Validators.required],
    dueDate:['',Validators.required],
    teamMembers:[''],
    category:['',Validators.required],
    projectManager:['',Validators.required],
    description:['',Validators.required]
  })

  constructor(
    private _formBuilder:FormBuilder,
    private _toastr:ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._categorySaveSubscription.unsubscribe()
  }

  showProjectForm(){
    this.isShowProjectForm = !this.isShowProjectForm
  }

  
  submitProject(){
    console.log(this.projectFormGroup.value)
  }

}
