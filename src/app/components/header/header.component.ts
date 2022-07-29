import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() email:String =''
  isOptionOpen:boolean = false
  constructor() { }

  ngOnInit(): void {
  }

  ToggleOptions(){
    this.isOptionOpen = !this.isOptionOpen
  }

}
