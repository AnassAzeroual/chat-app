import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, Subscriber } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ConnectService {
  readonly uri: string = 'ws://localhost:3000';
  private socket: any;
  public response: boolean;

  constructor() {
    this.socket = io(this.uri)
  }


  sendMessage(data)
    {
      console.log("sendMessage");
      console.log(data);
      
      if(this.socket.connected==true)
      {
        this.socket.emit('message',data);
        this.response=true;
      }
  
      else
      {
        this.response=false;
      }
  
      return this.response;
    }


    joinRoom(data)
    {
      this.socket.emit('join',data);
    }

    leaveRoom(data)
    {
        this.socket.emit('leave',data);
    }

    getMessages(){
        let observable = new Observable<{user:String,host_id:String, message:String,room:String}>(observer=>{
            this.socket.on('new message', (data)=>{
                observer.next(data);
            });
            return () => {this.socket.disconnect();}
        });

        return observable;
    }

}
