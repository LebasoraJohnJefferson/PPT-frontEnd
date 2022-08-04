import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  @Input() content:String = ''
  @Input() isProject:boolean=true
  fakeArray = new Array(5)
  isAsideOpen:boolean=true
  constructor() { }


  ngOnInit(): void {
  }

  openAside(){
    this.isAsideOpen = !this.isAsideOpen
  }
}
