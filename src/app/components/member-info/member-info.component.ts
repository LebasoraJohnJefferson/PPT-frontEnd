import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-member-info',
  templateUrl: './member-info.component.html',
  styleUrls: ['./member-info.component.css']
})
export class MemberInfoComponent implements OnInit {
  fakeBoolean:boolean = false
  fakeArray = new Array(3)
  constructor() { }

  ngOnInit(): void {
  }

}
