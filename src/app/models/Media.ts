import { Question } from "./Question";
import { TypeMedia } from "./TypeMedia";

export interface Media{
    id: number;
    link: String;
    type: TypeMedia;
    question: Question
}