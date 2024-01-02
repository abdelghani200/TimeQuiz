import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../models/chat/Message';
import { Observable } from 'rxjs';
import { API_URLS } from '../shared/config/API';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  getChats(): Observable<Message[]> {
    return this.http.get<Message[]>(API_URLS.Messages_URL)
    .pipe(
      tap(chats => console.log('Received answers from service:', chats))
    );
  }

 
}
