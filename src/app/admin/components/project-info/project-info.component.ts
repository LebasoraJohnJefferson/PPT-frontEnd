import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/service/project.service';
import { ManagersService } from 'src/app/service/managers.service';
import { TasksService } from 'src/app/service/tasks.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute,Router  } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import moment from 'moment';



@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  defaultProfilePicture:string = environment.default_profile
  memberFakeArrayForAnimation = new Array(5)
  members:any = []
  managers:any = []
  categories:any = []
  projectInfo:any = []
  memberAvailableToAdd:any =[]
  memberId:any= 0
  categoryID:any = 0
  memberName:any = ''
  age:any= 0
  birthDay:any = 0
  totalBudgetUsed:any = 0
  isMemberPlaceHolderAnimation:boolean = true
  isRemoveMemberConfirmation:boolean = false
  isRemovalOfMemberAnimation:boolean = false
  isChangeMemberLoadingAnimation:boolean = false
  isChangeCategoryLoadingAnimation:boolean = false
  isChangeProjectLoadingAnimation:boolean = false
  isChangeCategoryForm:boolean = false
  isChangeProjectForm:boolean = false
  isShowAddMemberFormAnimationBtn:boolean = false
  isShowChangeManagerFormAnimationBtn:boolean = false
  isShowChangeCategoryFormAnimationBtn:boolean = false
  isShowChangeProjectFormAnimationBtn:boolean = false
  isShowAddMemberForm:boolean = false
  isShowAddManagerForm:boolean = false
  isSwitch:boolean = false

  
  memberAddFormGroup:FormGroup = this._formBuilder.group({
    teamMembers:['',Validators.required],
  })
  
  ProjectUpdateFormGroup:FormGroup = this._formBuilder.group({
    projectName:['',Validators.required],
    budget:[0,Validators.required],
    kickOff:['',Validators.required],
    dueDate:['',Validators.required],
    description:['',Validators.required]
  })

  projectManagerFormGroup:FormGroup = this._formBuilder.group({
    id:['',Validators.required],
  })
  
  projectCategoryFormGroup:FormGroup = this._formBuilder.group({
    fullName:['',Validators.required],
    description:['',Validators.required],
  })
  
  private _projectInformation:Subscription = new Subscription()
  private _allJoinMembers:Subscription = new Subscription()
  private _removalOfMember:Subscription = new Subscription()
  private _addMemberIntoTheProject:Subscription = new Subscription()
  private _retrieveAllInfoCategorySubscription:Subscription = new Subscription()
  private _getAllProjectManger:Subscription = new Subscription()
  private _changeProjectManager:Subscription = new Subscription()
  private _changeCategoryManager:Subscription = new Subscription()
  private _saveProjectUpdatedDetails:Subscription = new Subscription()
  


  // ###kanban variables ###

  private _addTaskIntoTheProject:Subscription = new Subscription()
  private _getAllTask:Subscription = new Subscription()
  private _deleteTaskById:Subscription = new Subscription()
  private _updateTaskById:Subscription = new Subscription()

  isProjectAddTaskFormOpen:boolean = false
  isTaskUpdateFormOpen:boolean = false
  isAddTaskAnimation:boolean = false
  OpenVIewMoreById:number = 0
  TaskIdToBeDeleted:number = 0
  TaskNameToBeDeleted:string = ''
  isRemovalOfTaskAnimation:boolean = false
  isShowDeleteTaskNotification:boolean = false
  pending:any = ['task1', 'task2', 'task3', 'task4', 'task5'];
  onGoing:any = [];
  done:any = []
  tasks:any = []
  taskId:number = 0

  AddTaskFormGroup:FormGroup = this._formBuilder.group({
    taskName:['',Validators.required],
    budget:[0,Validators.required],
    kickOff:['',Validators.required],
    dueDate:['',Validators.required],
    description:['',Validators.required]
  })

  UpdateTaskFormGroup:FormGroup = this._formBuilder.group({
    taskName:['',Validators.required],
    budget:[0,Validators.required],
    kickOff:['',Validators.required],
    dueDate:['',Validators.required],
    description:['',Validators.required]
  })





  constructor(
    private _projectService:ProjectService,
    private _routes:ActivatedRoute,
    private _router:Router,
    private _toastr:ToastrService,
    private _formBuilder:FormBuilder,
    private _managerService:ManagersService,
    private _taskService:TasksService
  ) { 
    this.getAllInformationOfProject()
    this.getAllMembers()
    this.getTasks()
  }

  ngOnDestroy(){
    this._projectInformation.unsubscribe()
    this._allJoinMembers.unsubscribe()
    this._removalOfMember.unsubscribe()
    this._addMemberIntoTheProject.unsubscribe()
    this._retrieveAllInfoCategorySubscription.unsubscribe()
    this._getAllProjectManger.unsubscribe()
    this._changeProjectManager.unsubscribe()
    this._changeCategoryManager.unsubscribe()
    this._saveProjectUpdatedDetails.unsubscribe()
    this._addTaskIntoTheProject.unsubscribe()
    this._getAllTask.unsubscribe()
    this._deleteTaskById.unsubscribe()
    this._updateTaskById.unsubscribe()
  }

  getAllInformationOfProject(){
    this._projectInformation = this._projectService.getProjectById(this._routes.snapshot.paramMap.get('id'))
    .subscribe((res)=>{
      this.totalBudgetUsed = res.totalBudgetUsed
      this.projectInfo = res.ProjectDetails
      let timeDiff = Math.abs(Date.now() - new Date(this.projectInfo.Manager.managerDetails.birthDay).getTime())
      this.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25)
      this.birthDay =new Date(this.projectInfo.Manager.managerDetails.birthDay)
    },()=>{
      this._toastr.warning("Project does`nt exist!")
      this._router.navigate(['/dashboard/projects'])
    })
  }

  removeMemberById(id:any,memberName:any){
    this.memberId = id
    this.isRemoveMemberConfirmation = true
    this.memberName = memberName
  }

  commitRemovalOfMember(){
    this.isRemovalOfMemberAnimation = true
    this._removalOfMember = this._projectService.removalOfMember(this.memberId).subscribe(()=>{
      this._toastr.success(`Successfully remove ${this.memberName}`)
      this.getAllMembers()
      this.closeRemovalOfMember()
    },(err)=>{
      this._toastr.warning(err.error.detail)
    })
  }

  closeRemovalOfMember(){
    this.memberId = 0
    this.isRemoveMemberConfirmation = false
    this.isRemovalOfMemberAnimation = false
    this.memberName = ''
  }

  addMemberIntoTheProject(){
    this.isShowAddMemberForm = true
    this._retrieveAllInfoCategorySubscription = this._projectService.getAllUserNotInProject(this._routes.snapshot.paramMap.get('id'))
    .subscribe((res)=>{
      this.memberAvailableToAdd=res
    })
  }

  closeMemberForm(){
    this.isShowAddMemberForm = false
  }

  submitAddMember(){
    this.isShowAddMemberFormAnimationBtn= true
    if(this.memberAddFormGroup.valid){
      this._addMemberIntoTheProject = this._projectService.addMemberIntoTheProject(this._routes.snapshot.paramMap.get('id'),this.memberAddFormGroup.value).subscribe(()=>{
        this.isShowAddMemberFormAnimationBtn = false
        this.getAllMembers()
        this.closeMemberForm()
        this._toastr.success("Members successfully added!")
        this.memberAddFormGroup.reset()
      },(err)=>{
        this._toastr.warning(err.error.detail)
        this.isShowAddMemberFormAnimationBtn = false
      })
    }else{
      this._toastr.warning("Empty Inputs!")
      this.isShowAddMemberFormAnimationBtn = false
    }
  }

  changeManager(){
    this.isShowAddManagerForm = true
    this._getAllProjectManger = this._managerService.allManager().subscribe((res)=>{
      this.managers = res
    })
  }

  submitChangeMember(){
    this.isChangeMemberLoadingAnimation = true
    this.isShowChangeManagerFormAnimationBtn = true
    if(this.projectManagerFormGroup.valid){
      this._changeProjectManager = this._projectService.changeProjectManagerByProjectId(this._routes.snapshot.paramMap.get('id'),this.projectManagerFormGroup.value).subscribe(()=>{
        this.isShowChangeManagerFormAnimationBtn = false
        this.getAllInformationOfProject()
        this._toastr.success("Manager successfully changed!")
        this.closeChangeManager()
        this.isChangeMemberLoadingAnimation = false
      },(err)=>{
        this.isChangeMemberLoadingAnimation = false
        this._toastr.warning(err.error.detail)
        this.isShowChangeManagerFormAnimationBtn = false
      })
    }else{
      this.isChangeMemberLoadingAnimation = false
      this.isShowChangeManagerFormAnimationBtn = false
      this._toastr.warning("Empty Inputs!")
    }
  }
  
  closeChangeManager(){
    this.isShowAddManagerForm = false
  }

  changeCategory(id:any){
    this.categoryID = id
    this.projectCategoryFormGroup.get("fullName")?.setValue(this.projectInfo.Category.fullName)
    this.projectCategoryFormGroup.get("description")?.setValue(this.projectInfo.Category.description)
    this.isChangeCategoryForm = true
  }

  submitChangeCategory(){
    this.isChangeCategoryLoadingAnimation = true
    this.isShowChangeCategoryFormAnimationBtn = true
    if(this.projectCategoryFormGroup.valid){
      this._changeCategoryManager = this._projectService.changeProjectCategoryByProjectId(this.categoryID,this.projectCategoryFormGroup.value).subscribe(()=>{
        this._toastr.success("Successfully updated the category!")
        this.getAllInformationOfProject()
        this.closeChangeCategory()
        this.isChangeCategoryLoadingAnimation = false
        this.isShowChangeCategoryFormAnimationBtn = false
      },(err)=>{
        this._toastr.warning(err.error.detail)
        this.isChangeCategoryLoadingAnimation = false
        this.isShowChangeCategoryFormAnimationBtn = false
      })
    }else{
      this.isChangeCategoryLoadingAnimation = false
      this.isShowChangeCategoryFormAnimationBtn = false
      this._toastr.warning("Empty Inputs!")
    }
  }

  closeChangeCategory(){
    this.isChangeCategoryForm = false
  }

  getAllMembers(){
    this.isMemberPlaceHolderAnimation = true
    this._allJoinMembers = this._projectService.getAllMemberByProjectId(this._routes.snapshot.paramMap.get('id')).subscribe((res)=>{
      this.members = res
      this.isMemberPlaceHolderAnimation = false
    })
  }

  openProjectFormForUpdate(){
    this.ProjectUpdateFormGroup.get("projectName")?.setValue(this.projectInfo.Project.projectName)
    this.ProjectUpdateFormGroup.get("budget")?.setValue(this.projectInfo.Project.budget)
    this.ProjectUpdateFormGroup.get("kickOff")?.setValue(this.projectInfo.Project.kickOff)
    this.ProjectUpdateFormGroup.get("dueDate")?.setValue(this.projectInfo.Project.dueDate)
    this.ProjectUpdateFormGroup.get("description")?.setValue(this.projectInfo.Project.description)
    this.isChangeProjectForm = true
  }

  saveProjectUpdatedDetails(){
    this.isChangeProjectLoadingAnimation=true
    this.isShowChangeProjectFormAnimationBtn = true
    if(this.ProjectUpdateFormGroup.valid){
      this._saveProjectUpdatedDetails = this._projectService.projectDetailsUpdating(this.projectInfo.Project.id,this.ProjectUpdateFormGroup.value).subscribe(()=>{
        this._toastr.success('Project Information successfully updated')
        this.closeChangeProjectForm()
        this.getAllInformationOfProject()
        this.isChangeProjectLoadingAnimation=false
        this.isShowChangeProjectFormAnimationBtn = false
      },(err)=>{
        if(err.error.detail) { this._toastr.warning(err.error.detail) }
        else if (err.error.detail[0].msg){ this._toastr.warning(err.error.detail[0].msg) }
        else { this._toastr.warning("SERVER ERROR") }
        this.isShowChangeProjectFormAnimationBtn = false
        this.isChangeProjectLoadingAnimation=false
      })
    }else{
      this.isChangeProjectLoadingAnimation=false
      this._toastr.warning('Invalid Inputs')
      this.isShowChangeProjectFormAnimationBtn = false
    }
  }

  closeChangeProjectForm(){
    this.isChangeProjectForm = false
  }

  switch(nav:string){
    this.isSwitch = nav == 'Project' ? true : false
  }


  // ###########################KANBAN###############################


  openAddTaskForm(){
    this.isProjectAddTaskFormOpen = true
  }

  closeTaskForm(){
    this.isProjectAddTaskFormOpen = false
  }
  
  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
        );
      }
      if(event.container.id != event.previousContainer.id){
        let temp = event.container.id
        if(temp == "pending"){
          console.log('pending')
        }else if(temp == "onGoing"){
          console.log('on going')
        }else{
          console.log('finished')
        }
      }
    }

  

  AddTaskSubmit(){
    this.isAddTaskAnimation = true
    if(this.AddTaskFormGroup.valid){
      this._addTaskIntoTheProject = this._taskService.AddTask(this._routes.snapshot.paramMap.get('id'),this.AddTaskFormGroup.value).subscribe(()=>{
        this._toastr.success('Added task successfully!')
        this.getTasks()
        this.getAllInformationOfProject()
        this.closeTaskForm()
        this.isAddTaskAnimation=false
        this.AddTaskFormGroup.reset()
      },(err)=>{
        this.isAddTaskAnimation=false
        this._toastr.warning(err.error.detail)
      })
    }else{
      this.isAddTaskAnimation=false
      this._toastr.warning("Invalid Inputs!")
    }
  }

  getTasks(){
    this._getAllTask = this._taskService.getAllTask(this._routes.snapshot.paramMap.get('id'))
    .subscribe((res)=>{
      this.tasks = res
      let temp_pending:any = []
      let temp_onGoing:any = []
      let temp_done:any = []
      console.log(res)
      this.tasks.forEach((data:any)=>{
        if(data.status == 'pending'){
          temp_pending.push(data)
        }else if(data.status == 'onGoing'){
          temp_onGoing.push(data)
        }else{
          temp_done.push(data)
        }
      })
      this.pending = temp_pending
      this.onGoing = temp_onGoing
      this.done = temp_done
    })
  }

  deleteTask(id:number,taskName:string){
    this.TaskIdToBeDeleted=id
    this.TaskNameToBeDeleted = taskName
    this.isShowDeleteTaskNotification = true
  }

  cancelDeleteTask(){
    this.TaskIdToBeDeleted=0
    this.TaskNameToBeDeleted = ''
    this.isShowDeleteTaskNotification = false
  }

  commitRemovalOfTask(){
    this.isRemovalOfTaskAnimation = true
    this._deleteTaskById = this._taskService.deleteTaskById(this.TaskIdToBeDeleted).subscribe(()=>{
      this.getTasks()
      this.isRemovalOfTaskAnimation = false
      this._toastr.success(`${this.TaskNameToBeDeleted} successfully deleted!`)
      this.cancelDeleteTask()
    },(err)=>{
      this.isRemovalOfTaskAnimation = false
      this._toastr.success(err.error.detail)
    })
    
  }

  viewMoreTaskDetails(id:number){
    this.OpenVIewMoreById = id
  }

  closeViewMoreTaskDetails(){
    this.OpenVIewMoreById =0
  }

  UpdateTaskTaskSubmit(){
    if(this.UpdateTaskFormGroup.valid){
      this._updateTaskById = this._taskService.updateTaskById(this.taskId,this.UpdateTaskFormGroup.value)
      .subscribe(()=>{
        this.getTasks()
        this.UpdateTaskFormGroup.reset()
        this.closeUpdateTaskForm()
        this._toastr.success("Successfully Updated!")
      },(err)=>{
        this._toastr.warning(err.error.detail)
      })
    }
  }

  updateTaskForm(id:number){
    let task:any =[]
    this.isTaskUpdateFormOpen = true
    this.taskId = id
    task = this.tasks.filter((data:any)=>{ if(data.id == this.taskId) return data })
    this.UpdateTaskFormGroup.get("taskName")?.setValue(task[0].taskName)
    this.UpdateTaskFormGroup.get("budget")?.setValue(task[0].budget)
    let kickOffTemp = moment.utc(new Date(task[0].kickOff))
    let kickLocal = moment(kickOffTemp).local().format('YYYY-MM-DD HH:mm:ss');
    this.UpdateTaskFormGroup.get("kickOff")?.setValue(kickLocal)
    let dueDateTemp = moment.utc(new Date(task[0].dueDate))
    let dueLocal = moment(dueDateTemp).local().format('YYYY-MM-DD HH:mm:ss');
    this.UpdateTaskFormGroup.get("kickOff")?.setValue(kickLocal)
    this.UpdateTaskFormGroup.get("dueDate")?.setValue(dueLocal)
    this.UpdateTaskFormGroup.get("description")?.setValue(task[0].description)
  }

  closeUpdateTaskForm(){
    this.isTaskUpdateFormOpen = false
    this.taskId = 0
  }
    
    ngOnInit(): void {
      
    }
  }
