import { Component, OnInit } from '@angular/core';
import Gantt from 'frappe-gantt';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  dateArrange ='Day'
  gantt:any;
  tasks:any;
  
  constructor() {
    this.tasks = [
      {
          id: 'Task 1',
          name: 'Buy hosting',
          start: '2022-01-22',
          end: '2022-01-23',
          progress: 100,
      },
      {
          id: 'Task 2',
          name: 'Draw wireframes',
          start: '2022-01-23',
          end: '2022-01-25',
          progress: 100,
      },
      {
          id: 'Task 3',
          name: 'Visual Design',
          start: '2022-01-25',
          end: '2022-01-27',
          progress: 20,
          dependencies: 'Task 2'
      },
      {
          id: 'Task 4',
          name: 'Build frontend',
          start: '2022-02-01',
          end: '2022-02-03',
          progress: 0,
          dependencies: 'Task 3'
      },
      {
          id: 'Task 5',
          name: 'Build backend',
          start: '2022-02-03',
          end: '2022-02-07',
          progress: 0,
      },
      {
          id: 'Task 6',
          name: 'Deploy Website',
          start: '2022-02-07',
          end: '2022-02-09',
          progress: 0,
          dependencies: 'Task 4, Task 5'
      },
    ]
  }

  ngOnInit(): void {
    this.DateArranger(this.dateArrange)
  }

  DateArranger(dateEvent:any){
    this.dateArrange=dateEvent
    this.gantt = new Gantt('#gantt', this.tasks, {
      on_click:function(task) {
        console.log(task)
      },
      on_date_change: function(task, start, end) {
        console.log(task, start, end);
      },
      on_progress_change: function(task, progress) {
        console.log(task, progress);
      },
      on_view_change: function(mode) {
        console.log(mode);
      },
      view_mode: dateEvent,
      language: 'en',
    });

  }

}
