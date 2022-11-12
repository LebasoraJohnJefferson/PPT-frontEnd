import { Chart,registerables  } from 'chart.js';
import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-doughnut-charts',
  templateUrl: './doughnut-charts.component.html',
  styleUrls: ['./doughnut-charts.component.css']
})
export class DoughnutChartsComponent implements OnInit {
  canvas: any;
  ctx: any;
  @ViewChild('mychart2') mychart2:any;

  ngAfterViewInit() {
    this.canvas = this.mychart2.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'doughnut',
      data: {
        labels: [
          'Task done',
          'Pending'
        ],
        datasets: [{
          data: [30, 70],
          backgroundColor: [
            "#23C403",
            "#C20712",
          ],
          hoverOffset: 7
        }]
      },options:{
        plugins:{
          tooltip:{
            callbacks:{
              label: function(context) {
                let label = context.label;
                let value = context.formattedValue;

                if (!label)
                    label = 'Unknown'

                let sum = 0;
                let dataArr = context.chart.data.datasets[0].data;
                dataArr.map(data => {
                    sum += Number(data);
                });
                let percent = (parseInt(value) * 100 / sum)
                let percentage = `${percent}%`;
                return label + ": " + percentage;
              }
            }
          }
        }
      }
  });
  }

  constructor() { 
    Chart.register(...registerables);
  }
  ngOnInit(): void {
  }

}
