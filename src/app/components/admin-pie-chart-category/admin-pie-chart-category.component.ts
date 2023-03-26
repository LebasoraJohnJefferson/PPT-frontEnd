import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart,registerables  } from 'chart.js';


@Component({
  selector: 'app-admin-pie-chart-category',
  templateUrl: './admin-pie-chart-category.component.html',
  styleUrls: ['./admin-pie-chart-category.component.css']
})
export class AdminPieChartCategoryComponent implements OnInit {
  canvas: any;
  ctx: any;
  @ViewChild('pieChart') pieChart:any;
  
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(){
    this.canvas = this.pieChart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');
    new Chart(this.ctx, {
      type: 'doughnut',
      options:{
        scales:{
          ticks: {
            display: false
        },
          x:{
            display:false
            
          },
          y:{
            display:false
            
          }
        },
        responsive: true,
        plugins:{
          legend:{
            position:'right',
            align:'center',
            labels:{
              font:{
                size:12
              }
            }
            
          },
          title:{
            color:'black',
            display:true,
            text:'Category',
            font: {
              size: 20,
              weight: 'bold',
              lineHeight: 2,
            },
          }
        }
      },
      data: {
        labels: ['IT','ME','CE'],
        datasets: [{
          data: [1,2,3],
          borderColor: 'pink',
          backgroundColor: ['red','blue','green'],
        }
      ],
      },
    });
  }


}
