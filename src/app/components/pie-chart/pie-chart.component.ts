import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { Chart,registerables  } from 'chart.js';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  canvas: any;
  ctx: any; 
  @Input() StageInfo:any = []
  @Input() title:string=''
  @Input() category:string=''
  label:any;
  data:any= [1]
  backgroundColor:any=["gray"]
  phases:any=[
    ["No Data"],
    ["Requirements", "Designs","Implementations","Verifications","Maintenance"],
    ["defines","measures","analyze","designs","verifies"],
    ["designs","bids","builds"]
  ]
  colorBackground:any = [
    ["gray"],
    ["#FFE84C","#107A88","#2CB977","#83E85A","#3B5343"],
    ["#E14F01","#EF9101","#FFE600","#DA0106","#B80102"],
    ["red","blue","green"]
  ]
  @ViewChild('pieChart') pieChart:any;
  constructor() {
    Chart.register(...registerables);
  }
 

  ngOnInit(): void {
    
  }


  ngAfterViewInit(){
    let index = 0
    if(this.category == "IT" && this.StageInfo.total!=0){
      index =1
      this.data = [((this.StageInfo.requirements/this.StageInfo.total)*100).toFixed(2),
                    ((this.StageInfo.designs/this.StageInfo.total)*100).toFixed(2),
                    ((this.StageInfo.implementations/this.StageInfo.total)*100).toFixed(2),
                    ((this.StageInfo.verifications/this.StageInfo.total)*100).toFixed(2),
                    ((this.StageInfo.maintenance/this.StageInfo.total)*100).toFixed(2)
                  ]
    this.backgroundColor= this.colorBackground[index]
    }else if(this.category == "ME" && this.StageInfo.total!=0){
      index = 2
      this.data = [((this.StageInfo.defines/this.StageInfo.total)*100).toFixed(2),
                    ((this.StageInfo.measures/this.StageInfo.total)*100).toFixed(2),
                    ((this.StageInfo.analyze/this.StageInfo.total)*100).toFixed(2),
                    ((this.StageInfo.designs/this.StageInfo.total)*100).toFixed(2),
                    ((this.StageInfo.verifies/this.StageInfo.total)*100).toFixed(2)
                  ]
      this.backgroundColor= this.colorBackground[index]
    }
    else if(this.category == "CE" && this.StageInfo.total!=0){
      index = 3
      this.data = [((this.StageInfo.designs/this.StageInfo.total)*100).toFixed(2),
                    ((this.StageInfo.bids/this.StageInfo.total)*100).toFixed(2),
                    ((this.StageInfo.builds/this.StageInfo.total)*100).toFixed(2),
                  ]
      this.backgroundColor= this.colorBackground[index]
    }
    this.label = this.phases[index]
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
            display:false
          },
          title:{
            color:'white',
            display:true,
            text:this.title,
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
          data: this.data,
          borderColor: 'pink',
          backgroundColor: this.backgroundColor,
        }
      ],
      },
    });
  }

} 
