import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Message } from 'src/app/models/chat/Message';
import { AppState } from 'src/app/store/reducers';
import { selectChats } from 'src/app/store/selectors/chat.selectors';
import * as ChatActions from '../../../store/actions/chat.actions'
import { map, tap } from 'rxjs/operators';
import { FormconfigService } from 'src/app/services/formconfig.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @Output() closeChatEvent = new EventEmitter<void>();
  showChat = true;

  chats$: Observable<Message[]>
  filteredChats$!: Observable<Message[]>
  currentChats: Message[] = []
  currentChat: any;

  filteredChats: Message[] = [];

  chatForm !: FormGroup

  constructor(private store: Store<AppState>, private formConfig: FormconfigService, private fb: FormBuilder) {
    this.chats$ = this.store.pipe(select(selectChats));
    this.createForm()
  }

  ngOnInit(): void {
    this.store.dispatch(ChatActions.loadChats());
    this.chats$.subscribe(chats => {
      this.currentChats = chats;
      console.log('Current chats:', this.currentChats);
    });
    // this.filteredChats$ = this.filterChats();
    this.filteredChats$.subscribe(filteredChats => {
      this.filteredChats = filteredChats;
    });
  }

  closeChat() {
    this.showChat = false;
    this.closeChatEvent.emit();
  }

  selectStudent(studentId: number) {
    this.store.dispatch(ChatActions.selectStudent({ studentId }));
  }

  changeChat(chat: any) {
    this.currentChat = Object.values(chat);
    // this.filteredChats$ = this.filterChats();
  }

  // filterChats() {
  //   console.log('Current Chat:', this.currentChat);

  //   return this.chats$.pipe(
  //     tap(chats => console.log('All chats:', chats)),
  //     map(chats => chats.filter(chat => this.currentChat.includes(chat.conversation))),
  //     tap(filteredChats => console.log('Filtered chats:', filteredChats))
  //   );
  // }

  createForm() {
    this.chatForm = this.fb.group({
      content: ['', Validators.required],
      date: ['', Validators.required],
      room_id: [this.currentChat?.room_id || '', Validators.required],
      student_id: [this.currentChat?.conversation?.id || '', Validators.required],
    });
  }

  formFields = this.formConfig.getLevelFormConfig()

  sendMessage() {
    const newMessage = this.chatForm.value as Message;
    this.store.dispatch(ChatActions.sendMessage({ message: newMessage }));
    this.resetForm()
  }


  cancelAddOrEdit() {
    this.resetForm();
  }

  resetForm() {
    this.chatForm.reset();
  }

}
