import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/chat/Message';
import { AppState } from 'src/app/store/reducers';
import { selectChats } from 'src/app/store/selectors/chat.selectors';
import * as ChatActions from '../../../store/actions/chat.actions'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{

  @Output() closeChatEvent = new EventEmitter<void>();
  showChat = true;

  chats$: Observable<Message[]>
  currentChats: Message[] = []

  constructor(private store: Store<AppState>){
    this.chats$ = this.store.pipe(select(selectChats));
  }

  ngOnInit(): void {
    this.store.dispatch(ChatActions.loadChats());
    this.chats$.subscribe(chats => {
      this.currentChats = chats;
      console.log('Current chats:', this.currentChats);
    });
  }

  closeChat() {
    this.showChat = false;
    this.closeChatEvent.emit();
  }

}
