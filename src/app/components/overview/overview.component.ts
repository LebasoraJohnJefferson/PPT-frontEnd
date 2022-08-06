import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  fakeArray = new Array(2)
  fakeArray2 = new Array(10)
  constructor() { }

  ngOnInit(): void {
  }

}
