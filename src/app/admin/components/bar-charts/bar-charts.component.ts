import { Component, OnInit,ViewChild,Input  } from '@angular/core';
import { Chart,registerables  } from 'chart.js';


@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.css']
})
export class BarChartsComponent implements OnInit {
  @Input() projectInfo:any=[];
  canvas: any;
  ctx: any;
  projectLabel:string[] = []
  numberOfTask:number[] = []
  numberOfTaskDone:number[] = []
  @ViewChild('mychart3') mychart3:any;
  
  constructor() {
    Chart.register(...registerables);
  }
  
  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this.projectInfo.forEach((data:any)=>{
      console.log(data)
      this.projectLabel.push(data.Project.projectName)
      this.numberOfTask.push(data.numberOfTask)
      this.numberOfTaskDone.push(data.numberOfTaskDone)
    })
    this.canvas = this.mychart3.nativeElement; 
    this.ctx = this.canvas.getContext('2d');
    new Chart(this.ctx, {
      type: 'bar',
      options:{
        responsive: true,
        plugins:{
          title:{
            display:true,
            text:"Project Progress",
            font: {
              size: 25,
              weight: 'bold',
              lineHeight: 1.2,
            },
          }
        }
      },
      data: {
        labels: this.projectLabel,
        datasets: [{
          label: 'task already done',
          data: this.numberOfTask,
          borderColor: 'pink',
          backgroundColor: ["#800080"],
        },{
          label: 'Number of Task',
          data: this.numberOfTaskDone,
          borderColor: 'pink',
          backgroundColor: ["#009580"],
        }
      ],
      },
    });
  }

}
