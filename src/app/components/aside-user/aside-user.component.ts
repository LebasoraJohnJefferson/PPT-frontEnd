import { Component, OnInit,Input } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-aside-user',
  templateUrl: './aside-user.component.html',
  styleUrls: ['./aside-user.component.css']
})
export class AsideUserComponent implements OnInit {
  projectID:any;
  isSideBarOpen:boolean = true
  @Input() projectDetails:any=[];
  defaultImage:string =environment.default_profile

  constructor(
  ) { }

  ngOnInit(): void {
    
  }

  

  toggleAside(){
    this.isSideBarOpen = !this.isSideBarOpen
  }

  ngOnDestroy() {
  }

}
