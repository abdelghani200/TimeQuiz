import { Assignment } from "./Assignment";
import { Question } from "./Question";
import { Quiz } from "./Quiz";

export interface QuestionToQuiz{
    question: Question;
    assignment: Assignment;
    time: number
}