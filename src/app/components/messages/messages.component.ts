import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from 'src/app/service/messages.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  fakeArray = new Array(5)
  constructor(
    private route:ActivatedRoute,
    private messageService:MessagesService
  ) { 
    this.messageService.getMessages(this.route.snapshot.params.friend_id).subscribe((res)=>{
      console.log(res)
    },(err)=>{
      console.log(err)
    })
  }

  ngOnInit(): void {

  }

}
