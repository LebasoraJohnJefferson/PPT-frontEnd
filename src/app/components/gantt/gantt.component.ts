import { Component, OnInit } from '@angular/core';
import Gantt from 'frappe-gantt';
import moment from 'moment';




@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {

  dateArrange ='Day'
  gantt:any;
  changeDateByGantt:any;
  tasks:any=[
    {id: 'Task 1',
    name: 'Redesign website',
    start: '2016-12-28',
    end: '2016-12-31',
    progress: 20,
    dependencies: ''}
  ];

  constructor() { 
  }

  ngOnInit(): void {
    this.ganttDetails(this.dateArrange)
  }

  changeDate(date:any){
    this.gantt.change_view_mode(date.value)
  }

  ganttDetails(dateEvent:any){
    if(this.tasks.length == 0) return
    this.gantt = new Gantt('#gantt', this.tasks, {
      on_click: function (task) {
        console.log(task);
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
      custom_popup_html: function(task) {
        const end_date = moment(task.end).local().format('MMM D');
        const end_start = moment(task.start).local().format('MMM D');
        return `
        <div class="text-white rounded shadow-md overflow-hidden bg-transparent-black w-48 flex flex-col items-center justify-center">
          <h5 class="text-md p-1">${task.name}</h5>
          <small>Expected to start by ${end_start}</small>
          <small>Expected to finish by ${end_date}</small>
          <p>${task.progress}% completed!</p>
        </div>
        `;
      },
      view_mode: dateEvent,
      language: 'en',
      arrow_curve:0
    });
  }

}
