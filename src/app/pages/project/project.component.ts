import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() content:String = "Contributors"
  email:String = ''
  constructor(
    private toastr:ToastrService,
  ) {
    
  }

  ngOnInit(): void {
  }

}
