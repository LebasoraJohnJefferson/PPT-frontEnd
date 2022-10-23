import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/service/category.service';
import { MembersService } from 'src/app/service/members.service';

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
    private _toastr:ToastrService,
    private _categoryService:CategoryService,
    private _membersService:MembersService
  ) {
    this.getAllMembers('')
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this._categorySaveSubscription.unsubscribe()
  }

  showProjectForm(){
    this.isShowProjectForm = !this.isShowProjectForm
  }


  getAllMembers(role:string){
    this._membersService.getAllMembers().subscribe((res)=>{
      if((role == 'manager') && (this.projectFormGroup.controls.teamMembers.value!='')){
        let temp_members = this.projectFormGroup.controls.teamMembers.value
        let temp_array:any = []

        temp_members.forEach((data:any)=>{
          res.forEach((data2:any)=>{
            if(data !=data2.id){
              temp_array.push(data2)
            }
          })
        })
        this.managers = temp_array

      }else if ((role == 'member') && (this.projectFormGroup.controls.projectManager.valid) ){
        let temp_members_2 = this.projectFormGroup.controls.projectManager.value
        let temp_array_2:any = []

          res.forEach((data2:any)=>{
            if(temp_members_2 !=data2.id){
              temp_array_2.push(data2)
            }
          })
        this.members = temp_array_2
      }else{
        this.members=res
        this.managers = res
      }
    },(err)=>{
      console.log(err)
    })
  }

  
  submitProject(){
    console.log(this.projectFormGroup.value)
  }

}
