import { Message } from "src/app/models/chat/Message";


export interface ChatState {
    chats: Message[];
}

export const initialState: ChatState = {
    chats: [],
};
