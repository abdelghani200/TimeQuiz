import { Question } from "./Question";
import { Quiz } from "./Quiz";

export interface QuestionToQuiz{
    question: Question;
    quiz: Quiz;
    time: number
}