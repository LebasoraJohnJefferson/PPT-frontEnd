import { Component, OnInit,ViewChild  } from '@angular/core';
import { Chart,registerables  } from 'chart.js';


@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.css']
})
export class BarChartsComponent implements OnInit {
  public chart: any;
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;
  constructor() {
    Chart.register(...registerables);
  }
  
  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');
    new Chart(this.ctx, {
      type: 'bar',
      options:{
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
        labels: ["Project 1", "Project 2", "Project 3", "Project 4", "Project 5", "Project 6"],
        datasets: [{
          label: 'task already done',
          data: [8, 15, 3, 5, 5, 8],
          borderColor: 'pink',
          backgroundColor: ["#800080"],
        },{
          label: 'Number of Task',
          data: [10, 20, 4, 5, 8, 10],
          borderColor: 'pink',
          backgroundColor: ["#009580"],
        }
      ],
      },
    });
  }

}
