import { createAction, props } from "@ngrx/store";
import { Message } from "src/app/models/chat/Message";

export const loadChats = createAction('[Chat] load Chats');

export const loadChatsSuccess = createAction('[Chat] Load Chats Success', props<{ chats: Message[] }>());
export const loadChatsFailure = createAction('[Chat] Load Chats Failure', props<{ error: any }>());
