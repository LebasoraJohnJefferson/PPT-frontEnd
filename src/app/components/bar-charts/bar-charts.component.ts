import { Component, OnInit,ViewChild } from '@angular/core';
import { Chart,registerables  } from 'chart.js';



@Component({
  selector: 'app-bar-charts',
  templateUrl: './bar-charts.component.html',
  styleUrls: ['./bar-charts.component.css']
})
export class BarChartsComponent implements OnInit {
  canvas: any;
  ctx: any; 
  @ViewChild('mychart3') mychart3:any;
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.canvas = this.mychart3.nativeElement; 
    this.ctx = this.canvas.getContext('2d');
    new Chart(this.ctx, {
      type: 'bar',
      options:{
        scales:{
          x:{
            grid:{
              display:false
            }
          },
          y:{
            grid:{
              display:false
            }
          }
        },
        responsive: true,
        plugins:{
          title:{
            color:'black',
            display:true,
            text:"Progress",
            font: {
              size: 25,
              weight: 'bold',
              lineHeight: 1.2,
            },
          }
        }
      },
      data: {
        labels: ['activity 1','activity 2','activity 3', 'activity 4'],
        datasets: [{
          label: 'Number of task',
          data: [10,2,5,7],
          borderColor: 'pink',
          backgroundColor: ["#800080"],
        }
      ],
      },
    });
  }

}
