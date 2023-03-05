import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  @Input() bugs:any=[]
  isLogsOpen:boolean = false
  bugLength:number = 0
  constructor() { }

  ngOnInit(): void {
  }

  

  
  OpenLogs(){
    this.isLogsOpen = !this.isLogsOpen
  }

}
