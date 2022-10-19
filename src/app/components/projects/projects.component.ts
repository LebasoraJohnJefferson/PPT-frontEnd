import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  isShowProjectForm:boolean = false
  isShowCategoryForm:boolean = false
  categories = ['mason','electrical']
  managers = ['John Doe', 'James Smith' , 'Maria Clara']
  members: string[] = ['Juan', 'Johnny', 'Pedro', 'JM', 'CM', 'CH'];
  constructor() { }

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

}
