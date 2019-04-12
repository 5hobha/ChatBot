import { Injectable } from '@angular/core';
import * as sio from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
@Injectable({
  providedIn: 'root'
})

export class ChatService {

  private url = 'http://localhost:4200';
  private socket;

  constructor() { 
    this.socket = sio(this.url);
  }
  
  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public getMessages = (currsentMessage) => {
    console.log("getMessage Service")
    return Observable.create((observer) => {
        this.socket.on('reply-message', (message) => {
            console.log(message);
            observer.next(message);
        });
    });
}
}
