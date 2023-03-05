import { DragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit,Input } from '@angular/core';
import Gantt from 'frappe-gantt';
import moment from 'moment';




@Component({
  selector: 'app-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.css']
})
export class GanttComponent implements OnInit {
  today:Date = new Date()
  dateArrange ='Month'
  gantt:any;
  changeDateByGantt:any;
  @Input() gannttData:any;
  static:any=[
    {id: '1',
    name: '',
    start: this.today,
    end: this.today,
    progress: 20,
    dependencies: ''}
  ];

  constructor() { 
    
  }

  ngOnChanges() {
    this.ganttDetails(this.dateArrange)
  }

  ngOnInit(): void {
    this.ganttDetails(this.dateArrange)
  }

  changeDate(date:any){
    this.gantt.change_view_mode(date.value)
  }

  ganttDetails(dateEvent:any){
    if(typeof this.gannttData === 'undefined') return
    if(this.gannttData.length == 0){
      this.gannttData = this.static
    }
    this.gantt = new Gantt('#gantt', this.gannttData, {
      on_click:  (task:any)=> {
        // console.log(task);
      },
      on_date_change: (task:any, start:Date, end:Date)=> {
        // console.log(task, start, end);
      },
      on_progress_change: (task:any, progress:number)=> {
        // console.log(task, progress);
      },
      on_view_change: (mode:any)=> {
        // console.log(mode)
      },
      custom_popup_html: (task:any)=> {
        const end_date = moment(task.end).local().format('MMM D');
        const end_start = moment(task.start).local().format('MMM D');
        return `
        <div class="text-white rounded shadow-md overflow-hidden bg-transparent-black w-48 flex flex-col items-center justify-center">
          <h5 style="text-transform:capitalize" class="text-md p-1">${task.name}</h5>
          <small>Expected to start by ${end_start}</small>
          <small>Expected to finish by ${end_date}</small>
          <p>${task.progress}% completed!</p>
        </div>
        `;
      },
      
      view_mode: dateEvent,
      language: 'en',
      arrow_curve:3,
      bar_corner_radius:3,
    });
  }


}
