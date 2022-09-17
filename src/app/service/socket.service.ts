import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(
    private sockets:Socket
    ){
    }

    join(room:string,user:string){
      this.sockets.emit(room,{'user':user})
    }

    messageNotify():Observable<any>{
      return this.sockets.fromEvent<any>('messageNotify');
    }
    
    friendStatus():Observable<any>{
      return this.sockets.fromEvent<any>('friendStatus')
    }


    


}
