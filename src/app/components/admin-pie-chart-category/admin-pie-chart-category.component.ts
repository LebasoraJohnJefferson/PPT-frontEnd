import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { Chart,registerables  } from 'chart.js';


@Component({
  selector: 'app-admin-pie-chart-category',
  templateUrl: './admin-pie-chart-category.component.html',
  styleUrls: ['./admin-pie-chart-category.component.css']
})
export class AdminPieChartCategoryComponent implements OnInit {
  canvas: any;
  ctx: any;
  label:any = ['none']
  color:any = ['gray']
  @Input() pie:any=[];
  @ViewChild('pieChart') pieChart:any;
  
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    
  }

  
  ngOnChanges(){
    
  }

  

  ngAfterViewInit(){
    this.label = this.pie.length !=0 ? ['IT','ME','CE'] : ['None']
    this.color = this.pie.length !=0 ? ['red','blue','green'] : ['gray']
    this.pie = this.pie.length != 0 ? this.pie : [100]
    this.canvas = this.pieChart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');
    new Chart(this.ctx, {
      type: 'doughnut',
      options:{
        maintainAspectRatio:true,
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
            position:'bottom',
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
        labels: this.label,
        datasets: [{
          data: this.pie,
          borderColor: 'pink',
          backgroundColor: this.color,
        }
      ],
      },
    });
  }


}
