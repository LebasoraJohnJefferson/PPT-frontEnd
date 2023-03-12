import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { Chart,registerables  } from 'chart.js';

@Component({
  selector: 'app-pie-chart-user',
  templateUrl: './pie-chart-user.component.html',
  styleUrls: ['./pie-chart-user.component.css']
})
export class PieChartUserComponent implements OnInit {

  canvas: any;
  ctx: any; 
  @Input() progress:number = 0
  @Input() stage:string = ''
  @Input() title:string=''
  @Input() category:string=''
  label:any;
  data:any= [1]
  backgroundColor:any=["gray"]
  phases:any=[
    ["No Data"],
    ["Requirements", "Designs","Implementations","Verifications","Maintenance","On Progress"],
    ["defines","measures","analyze","designs","verifies","On Progress"],
    ["designs","bids","builds","On Progress"]
  ]
  colorBackground:any = [
    ["gray"],
    ["#FFE84C","#107A88","#2CB977","#83E85A","#3B5343","gray"],
    ["#E14F01","#EF9101","#FFE600","#DA0106","#B80102","gray"],
    ["red","blue","green","gray"]
  ]
  @ViewChild('pieChart') pieChart:any;
  constructor() {
    Chart.register(...registerables);
  }
 

  ngOnInit(): void {
    
  }


  ngAfterViewInit(){
    let index = 0
    if(this.category == "IT"){
      index =1
      let stagesProgress:any =  {"requirements":0, "designs":0,"implementations":0,"verifications":0,"maintenance":0}
      stagesProgress[this.stage] = this.progress
      let stillProgress = 1 - this.progress
      this.data = [
        ((stagesProgress.requirements)*100).toFixed(2),
        ((stagesProgress.designs)*100).toFixed(2),
        ((stagesProgress.implementations)*100).toFixed(2),
        ((stagesProgress.verifications)*100).toFixed(2),
        ((stagesProgress.maintenance)*100).toFixed(2),
        (stillProgress*100).toFixed(2)
      ]
    this.backgroundColor= this.colorBackground[index]
    }else if(this.category == "ME"){
      index = 2
      let stagesProgress:any = {"defines":0,"measures":0,"analyze":0,"designs":0,"verifies":0}
      stagesProgress[this.stage] = this.progress
      let stillProgress = 1 - this.progress
      this.data = [
        ((stagesProgress.defines)*100).toFixed(2),
        ((stagesProgress.measures)*100).toFixed(2),
        ((stagesProgress.analyze)*100).toFixed(2),
        ((stagesProgress.designs)*100).toFixed(2),
        ((stagesProgress.verifies)*100).toFixed(2),
        (stillProgress*100).toFixed(2)
      ]
      this.backgroundColor= this.colorBackground[index]
    }
    else if(this.category == "CE"){
      index = 3
      let stagesProgress:any = {"designs":0,"bids":0,"builds":0}
      stagesProgress[this.stage] = this.progress
      let stillProgress = 1 - this.progress
      this.data = [
        ((stagesProgress.designs)*100).toFixed(2),
        ((stagesProgress.bids)*100).toFixed(2),
        ((stagesProgress.builds)*100).toFixed(2),
        (stillProgress*100).toFixed(2)]
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

