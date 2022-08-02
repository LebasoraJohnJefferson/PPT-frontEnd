import { Chart,registerables  } from 'chart.js';
import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {


   
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart:any;

  ngAfterViewInit() {
    this.canvas = this.mychart.nativeElement; 
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'line',
      data: {
          datasets: [{
              label: 'Task Completed',
              data: [0, 20, 40, 50],
              backgroundColor: "rgb(115 185 243 / 65%)",
              borderColor: "#007ee7",
              fill: true,
          },
          {
            label: 'Budget',
            data: [0, 40, 25, 30, 80],
            backgroundColor: "#d32a01",
            borderColor: "#e06065",
            fill: true,
        }],
          labels: ['2019', '2020', '2021', '2022']
      },

  });
  }

  constructor() { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
  }

}
