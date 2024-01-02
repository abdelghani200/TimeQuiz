import { Answer } from "./Answer";
import { Question } from "./Question";

export interface Validation{
    id: number;
    points: number;
    question: Question;
    answer: Answer;
}