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
      type: 'doughnut',
      data: {
        labels: [
          'Completed',
          'On Going',
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [30, 70],
          backgroundColor: [
            'rgb(220,20,60)',
            'rgb(211,211,211)',
          ],
          hoverOffset: 4
        }]         
      }
    });
  }

  constructor() { 
    Chart.register(...registerables);
  }

  ngOnInit(): void {
  }

}
