import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Message } from '../../models/chat/Message';
import { API_URLS } from '../../shared/config/API';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class ChatService {



  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:9091/ws');
  }

  sendMessage(message: Message) {
    this.socket$.next({ type: 'SEND_MESSAGE', payload: message });
  }

  listenForMessages(): Observable<Message> {
    return this.socket$.asObservable();
  }

  // constructor(private http: HttpClient) { }

  // getChats(): Observable<Message[]> {
  //   return this.http.get<Message[]>(API_URLS.Messages_URL)
  //   .pipe(
  //     tap(chats => console.log('Received answers from service:', chats))
  //   );
  // }

  // getChatById(id: number): Observable<Message[]> {
  //   return this.http.get<Message[]>(API_URLS.Messages_URL + `/${id}`)
  // }

  // sendMessage(message: Message): Observable<Message[]>{
  //   return this.http.post<Message[]>(API_URLS.Messages_URL, message);
  // }

}
