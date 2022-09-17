import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
    projectName:string = ''
    constructor(
        private route:ActivatedRoute
    ){ 
        this.projectName = this.route.snapshot.params.projectName.toUpperCase()
    }

    addTask(){
        console.log("hi")
    }

    deleteTask(){

    }

    editTask(){

    }

    ngOnInit(): void {
    
    }

}