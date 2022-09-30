import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input() tasks:any = [];
  @Output() deleteTaskWithId =  new EventEmitter()
  
  constructor(
  ) {
    
  }

  ngOnInit(): void {
  }

  deleteTask(id:any){
    this.deleteTaskWithId.emit(id)
  }

}
