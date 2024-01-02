import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ChatState } from '../state/chat.state';


export const selectChatState = createFeatureSelector<ChatState>('chats');

export const selectChats = createSelector(
    selectChatState,
    (state: ChatState) => state.chats
);

