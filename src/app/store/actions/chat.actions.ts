import { createAction, props } from "@ngrx/store";
import { Message } from "src/app/models/chat/Message";

export const loadChats = createAction('[Chat] load Chats');

export const loadChatsSuccess = createAction('[Chat] Load Chats Success', props<{ chats: Message[] }>());
export const loadChatsFailure = createAction('[Chat] Load Chats Failure', props<{ error: any }>());
export const selectStudent = createAction(
    '[Chat] Select Student',
    props<{ studentId: number }>()
);

// export const sendMessage = createAction('[Chat] Send Message', props<{ message: Message }>());
export const sendMessageSuccess = createAction('[Chat] Send Message Success', props<{ message: Message }>());
export const sendMessageFailure = createAction('[Chat] Send Message Failure', props<{ error: any }>());

export const sendMessage = createAction(
    '[Chat] Send Message',
    props<{ message: Message }>()
);

export const receiveMessage = createAction(
    '[Chat] Receive Message',
    props<{ message: Message }>()
);