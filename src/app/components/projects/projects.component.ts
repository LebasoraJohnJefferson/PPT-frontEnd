import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';
import { TasksService } from 'src/app/service/tasks.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
    projectName:string = ''
    tasks:any;
    changeViewMode:any="Quarter Day"
    isCreateTaskOpen:boolean = false
    isSubmitting:boolean=false
    isSwitchPertAndTask:boolean=false
    taskDetails = this.fb.group({
        project_name:[null],
        task_name:[null,Validators.required],
        duration:[null,Validators.required],
        budget:[null,Validators.required],
        dependency:[null],
    })
    list_dependencies: string[] = [];
  

    
    constructor(
        private route:ActivatedRoute,
        private fb:FormBuilder,
        private toastr:ToastrService,
        private tasksService:TasksService
    ){ 
        this.projectName = this.route.snapshot.params.projectName.toUpperCase()
        this.getAllTask()
    }

    createTaskOpen(){
        this.isCreateTaskOpen = !this.isCreateTaskOpen
    }

    changeToPert(){
      this.isSwitchPertAndTask = true
    }

    changeToTask(){
      this.isSwitchPertAndTask = false
    }

    getAllTask(){
      this.tasksService.getAllTaskDetails(this.route.snapshot.params.projectName).subscribe((res)=>{
        let temp_list:any = []
        this.tasks = res
        this.tasks.forEach( (task:any) => {
          temp_list.push(task.task_name)
        });
        this.list_dependencies = temp_list
      },(err)=>{
        console.log(err)
      })
    }

    delTask(id:any){
      this.tasksService.deleteTask(id).subscribe((res)=>{
        this.getAllTask()
        this.toastr.success("successfully deleted!")
      },(err)=>{
        this.toastr.warning(err.error.detail)
      })
    }



    submitTask(){
      console.log(this.taskDetails.value.dependency)
        if(this.taskDetails.valid){
          if(this.taskDetails.value.duration>0 && this.taskDetails.value.budget>0){
            this.taskDetails.value.dependency = this.taskDetails.value.dependency != null ? this.taskDetails.value.dependency.toString() : ''
            this.taskDetails.value.project_name = this.route.snapshot.params.projectName
            this.tasksService.createTask(this.taskDetails.value).subscribe((res)=>{
              this.toastr.success("Successfully Created!")
              this.taskDetails.reset()
              this.getAllTask()
            },(err)=>{
              this.toastr.warning(err.error.detail)
            })
            console.log()
          }else{
            this.toastr.warning("negative number is not acceptable")
          }
        }else{
          this.toastr.warning("Invalid Inputs")
        }
    }

    changeViewModeEvent(event:any){
      this.changeViewMode = event
    }

    ngOnInit(): void {
    }


}
