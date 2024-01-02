import { MessageType } from "../enums/MessageType";
import { Conversation } from "./Conversation";
import { Room } from "./Room";

export interface Message{
    id: number;
    content: String;
    sender: String;
    type: MessageType;
    room: Room;
    conversation: Conversation;
}