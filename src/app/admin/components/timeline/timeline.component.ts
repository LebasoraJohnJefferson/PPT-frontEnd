import { Component, OnInit } from '@angular/core';
import Gantt from 'frappe-gantt';
import { TimelineService } from 'src/app/service/timeline.service';
import { Subscription } from 'rxjs';
import moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  dateArrange ='Day'
  gantt:any;
  tasks:any=[];
  
  private _timeLineInfo:Subscription = new Subscription()


  constructor(
    private _timeLineService:TimelineService,
    private router:Router
  ) {
    this.getTimeLineDetails()
  }

  ngOnInit(): void {
    this.DateArranger(this.dateArrange)
  }

  getTimeLineDetails(){
    var temp_data:any = []
    this._timeLineInfo = this._timeLineService.timeLine().subscribe((res)=>{
      res.forEach((data:any)=>{
        let id = data.projectDetails.id.toString()
        let name = data.projectDetails.projectName
        let start_temp = data.projectDetails.kickOff
        let start = moment(start_temp).local().format('YYYY-MM-DD');
        let end_temp = data.projectDetails.dueDate
        let end = moment(end_temp).local().format('YYYY-MM-DD');
        let progress =data.progress
        let dependencies = data.dependencies.toString()
        let classes = data.critical ? 'critical' : 'normal'
        if (data.dependencies.length == 0){
          temp_data.push({
            id:id,
            name:name,
            custom_class:classes,
            start:start,
            end:end,
            progress:progress
          })
        }else{
          temp_data.push({
            id:id,
            name:name,
            custom_class:classes,
            start:start,
            end:end,
            progress:progress,
            dependencies:dependencies
          })
        }        
      })
      this.tasks = temp_data
      this.DateArranger(this.dateArrange)
    })
  }

  DateArranger(dateEvent:any){
    if(this.tasks.length == 0) return
    this.dateArrange=dateEvent
    this.gantt = new Gantt('#gantt', this.tasks, {
      on_click:(task)=> {
        console.log(task);
        this.router.navigate([`/dashboard/projects/${task.id}`])
      },
      on_date_change: function(task, start, end) {
        console.log(task, start, end);
      },
      on_progress_change: function(task, progress) {
        console.log(task, progress);
      },
      on_view_change: function(mode) {
        console.log(mode);
      },custom_popup_html: function(task) {
        // the task object will contain the updated
        // dates and progress value
        const end_date = moment(task.end).local().format('MMM D');
        const end_start = moment(task.start).local().format('MMM D');
        return `
        <div class="text-white rounded shadow-md overflow-hidden bg-transparent-black w-48 flex flex-col items-center justify-center">
          <h5 class="text-lg">${task.name}</h5>
          <p>Expected to start by ${end_start}</p>
          <p>Expected to finish by ${end_date}</p>
          <p>${task.progress}% completed!</p>
        </div>
        `;
      },
      view_mode: dateEvent,
      language: 'en',
    });

  }

  ngOnDestroy() {
    this._timeLineInfo.unsubscribe()
  }

}
