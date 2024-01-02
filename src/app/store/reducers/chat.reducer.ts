import { createReducer, on } from '@ngrx/store';
import * as ChatActions from '../actions/chat.actions';
import { initialState,  } from '../state/chat.state';

export const chatReducer = createReducer(
    initialState,
    on(ChatActions.loadChatsSuccess, (state, { chats }) => ({ ...state, chats })),
    on(ChatActions.loadChatsFailure, (state, { error }) => {
        console.error('Error loading chats:', error);
        return state;
    }),
    
);


export { ChatState } from '../state/chat.state';