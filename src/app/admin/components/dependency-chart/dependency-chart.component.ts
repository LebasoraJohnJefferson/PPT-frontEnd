import { Component, OnInit,ViewChild,Input } from '@angular/core';
import {Chart,registerables} from 'chart.js'


@Component({
  selector: 'app-dependency-chart',
  templateUrl: './dependency-chart.component.html',
  styleUrls: ['./dependency-chart.component.css']
})
export class DependencyChartComponent implements OnInit {
  @Input() dataOfDependency:any=[]
  public chart:any;
  canvas: any;
  labels:any=[]
  progress:any=[]
  done:any=[]
  ctx: any;
  percent:any = 0
  @ViewChild('mychart') mychart:any;
  constructor() {
    Chart.register(...registerables);
  }
  
  ngOnInit(): void {
    this.dataOfDependency.Projects.forEach((data:any)=>{
      this.labels.push(data.dependencyInfo.projectName)
    })
    this.progress = this.dataOfDependency.temp_1
    this.done = this.dataOfDependency.temp_2
  }

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');
    this.chart = new Chart(this.ctx, {
      type: 'bar',
      options:{
        indexAxis: 'y',
        responsive: true,
        onClick: (event:any,i) => {
          if(i.length != 0){
            console.log(this.chart.data.labels[i[0].index])
          }
        },
        plugins:{
          title:{
            display:true,
            text:"Dependencies Progress",
            font: {
              size: 16,
              weight: 'bold',
              lineHeight: 1.2,
            },
          }
        }
      },
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Task done',
          data: this.done,
          borderColor: 'pink',
          backgroundColor: ["#23C403"],
        },{
          label: 'number of task',
          data: this.progress,
          borderColor: 'pink',
          backgroundColor: ["#C403B0"],
        }
      ],
      },
    });
  }

}
