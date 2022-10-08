import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';
import { TasksService } from 'src/app/service/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProjectsService } from 'src/app/service/projects.service';



@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
    projectName:string = ''
    role:string = ''
    tasks:any;
    updateTaskID:any;
    updateRetrieveData:any
    changeViewMode:any="Quarter Day"
    isCreateTaskOpen:boolean = false
    isUpdateTaskOpen:boolean = false
    isSubmitting:boolean=false
    isSwitchPertAndTask:boolean=true
    isKanbanOpen:boolean=true
    taskDetails = this.fb.group({
        project_name:[null],
        task_name:[null,Validators.required],
        duration:[null,Validators.required],
        budget:[null,Validators.required],
        dependency:[null],
    })

    taskUpdateDetails = this.fb.group({
      id:[null],
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
        private tasksService:TasksService,
        private router:Router,
        private projectService:ProjectsService
    ){ 
        this.projectName = this.route.snapshot.params.projectName.toUpperCase()
        this.getAllTask()
    }

    createTaskOpen(){
        this.isCreateTaskOpen = !this.isCreateTaskOpen
        this.taskDetails.reset()
    }

    changeToPert(){
      this.isSwitchPertAndTask = true
      this.isKanbanOpen = false
    }

    openKanBanContent(){
      this.isKanbanOpen = true
    }

    changeToTask(){
      this.isSwitchPertAndTask = false
      this.isKanbanOpen = false
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
        this.toastr.warning(err.error.detail)
        this.router.navigate(['/dashboard'])
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

    updateTask(id:any){
      this.isUpdateTaskOpen = true
      this.tasksService.getAllTaskByID(id).subscribe((res)=>{
        this.list_dependencies = res
      },(err)=>{
        console.log(err)
      })
      this.tasksService.getUpdateTaskById(id).subscribe((res)=>{
        this.updateRetrieveData = res
        this.taskUpdateDetails.get('id')?.setValue(id)
        this.taskUpdateDetails.get('task_name')?.setValue(this.updateRetrieveData.task_name)
        this.taskUpdateDetails.get('duration')?.setValue(this.updateRetrieveData.duration)
        this.taskUpdateDetails.get('budget')?.setValue(this.updateRetrieveData.budget)
        this.taskUpdateDetails.get('dependency')?.setValue(this.updateRetrieveData.dependency.split(","))
      },(err)=>{
        console.log(err)
      })
    }


    closeUpdateForm(){
      this.isUpdateTaskOpen = false
    }

    submitUpdateTask(){
      let commaExist = false
      if(this.taskUpdateDetails.valid){
        for(let i=0 ; i < this.taskUpdateDetails.value.task_name.length ; i++){
          if(this.taskUpdateDetails.value.task_name[i]==','){
            commaExist = true
            break
          }
        }
        if(!commaExist){
          this.tasksService.updateOneTask(this.taskUpdateDetails.value).subscribe((res)=>{
            this.toastr.success("successfully Updated!")
            this.getAllTask()
            this.isUpdateTaskOpen = false
          },(err)=>{
            console.log(err.error)
          })
        }else{
          this.toastr.warning("comma is not allowed in task name inputs")
        }
      }else{
        this.toastr.warning("Invalid Inputs")
      }
    }




    submitTask(){
        let commaExist = false
        this.isSubmitting = true
        if(this.taskDetails.valid){
          for(let i=0 ; i < this.taskDetails.value.task_name.length ; i++){
            if(this.taskDetails.value.task_name[i]==','){
              commaExist = true
              break
            }
          }

          if(!commaExist){
            if(this.taskDetails.value.duration>0 && this.taskDetails.value.budget>0){
              this.taskDetails.value.dependency = this.taskDetails.value.dependency != null ? this.taskDetails.value.dependency.toString() : ''
              this.taskDetails.value.project_name = this.route.snapshot.params.projectName
              this.tasksService.createTask(this.taskDetails.value).subscribe((res)=>{
                this.toastr.success("Successfully Created!")
                this.taskDetails.reset()
                this.getAllTask()
                this.isCreateTaskOpen = false
  
              },(err)=>{
                this.toastr.warning(err.error.detail)
              })
            }else{
                this.toastr.warning("negative number is not acceptable")
            }
          }else{
            this.toastr.warning("comma is not allowed in task name inputs")
          }
        }else{
          this.toastr.warning("Invalid Inputs")
        }
        this.isSubmitting = false
    }

    changeViewModeEvent(event:any){
      this.changeViewMode = event
    }

    ngOnInit(): void {
      this.route.params.subscribe(
        params => {
          this.projectService.member_or_admin(params.projectName).subscribe((res)=>{
            if(res.role == ''){
              this.router.navigate(['/dashboard'])
              this.toastr.warning("User is not admin nor member of the project!")
            }
            this.role = res.role
          },(err)=>{
            console.log(err)
          })
        })
    }


}
