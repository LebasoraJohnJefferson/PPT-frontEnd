import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() tasks:any = [];
  @Output() deleteTaskWithId =  new EventEmitter()
  @Output() updateTaskWithId =  new EventEmitter()
  
  constructor(
  ) {
    
  }

  ngOnInit(): void {
  }

  updateTask(id:any){
    this.updateTaskWithId.emit(id)
  }

  deleteTask(id:any){
    this.deleteTaskWithId.emit(id)
  }

}
