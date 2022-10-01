import { Component, OnInit,Input } from '@angular/core';
import { TasksService } from 'src/app/service/tasks.service';
import { ActivatedRoute } from '@angular/router';
import Gantt from 'frappe-gantt';


@Component({
  selector: 'app-pert-chart',
  templateUrl: './pert-chart.component.html',
  styleUrls: ['./pert-chart.component.css']
})
export class PertChartComponent implements OnInit {
  @Input() dateArrange ='Quarter Day'
  gantt:any;
  tasks:any;
  constructor(
    private taskService:TasksService,
    private route:ActivatedRoute,
  ) { 
    this.getAllProjectTask()
  }

  getAllProjectTask(){
    this.taskService.getAllTask(this.route.snapshot.params.projectName).subscribe((res)=>{
      this.tasks=res
    },(err)=>{
      console.log(err)
    })
  }

  ngOnChanges(changes:any) {
    this.DateArranger(this.dateArrange)
  }

  ngOnInit(): void {
    this.DateArranger(this.dateArrange)
  }

  DateArranger(dateEvent:any){
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
