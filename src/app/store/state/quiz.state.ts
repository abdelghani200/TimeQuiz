import { QuestionToQuiz } from "src/app/models/QuestionToQuiz";
import { Quiz } from "src/app/models/Quiz";

export interface QuizState {
    quizzs: Quiz[];
}

export const initialState: QuizState = {
    quizzs: []
};
