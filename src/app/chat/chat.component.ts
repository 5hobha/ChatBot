import { Component, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { MatDialog, MatDialogRef, MatList, MatListItem } from '@angular/material';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  message: string;
  currsentMessage: string;
  messages: messageResp[] = [];
  replyMessages: string[] = [];
  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService
      .getMessages(this.currsentMessage)
      .subscribe((message: messageResp) => {
        console.log("getMessage",message);
        this.messages.push(message);
        console.log(this.messages);
      });
  }
  sendMessage(data) {
    console.log(data);
    this.currsentMessage = data;
    this.chatService.sendMessage(data);
    this.messages.push({name:"You", message: data});
    this.message = '';
  }
}
interface messageResp {
  name: string,
  message: string
}