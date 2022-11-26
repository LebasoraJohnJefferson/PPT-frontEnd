import { Component, OnInit } from '@angular/core';
import Gantt from 'frappe-gantt';
import { TimelineService } from 'src/app/service/timeline.service';
import { Subscription } from 'rxjs';
import moment from 'moment';
import {MatTableDataSource} from '@angular/material/table';
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
  isSwitch:boolean = false
  
  displayedColumns: string[] = [
    'projectName',
    'duration', 
    'slack',
    'ES','EF','LS','LF',
    'pessimistic',
    'mostLikely',
    'optimistic',
    'variance'
  ];
  dataSource = new MatTableDataSource([{
    projectName:'',
    duration:'',
    slack:'',
    ES:'',
    EF:'',
    LF:'',
    LS:'',
    pessimistic:'',
    mostLikely:'',
    optimistic:'',
    variance:''
  }]);

  
  
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTimeLineDetails(){
    var temp_data:any = []
    let temp_table_data:any=[]
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
        temp_table_data.push({
          projectName:name,
          duration:data.duration,
          slack:data.slack,
          ES:data.early_start,
          EF:data.early_finish,
          LF:data.latest_finish,
          LS:data.latest_start,
          pessimistic:data.pessimistic,
          mostLikely:data.most_likely,
          optimistic:data.optimistic,
          variance:data.variance.toFixed(2)
        })
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
      this.dataSource = new MatTableDataSource(temp_table_data);
    })
  }

  changeDate(event:any){
    this.DateArranger(event.value)
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
        const end_date = moment(task.end).local().format('MMM D');
        const end_start = moment(task.start).local().format('MMM D');
        return `
        <div class="text-white rounded shadow-md overflow-hidden bg-transparent-black w-48 flex flex-col items-center justify-center">
          <h5 class="text-lg p-1">${task.name}</h5>
          <p>Expected to start by ${end_start}</p>
          <p>Expected to finish by ${end_date}</p>
          <p>${task.progress}% completed!</p>
        </div>
        `;
      },
      view_mode: dateEvent,
      language: 'en',
      arrow_curve:0
    });

  }

  switch(page:any){
    this.isSwitch = 'chart' == page ? true : false
    this.getTimeLineDetails()

  }

  ngOnDestroy() {
    this._timeLineInfo.unsubscribe()
  }

}
