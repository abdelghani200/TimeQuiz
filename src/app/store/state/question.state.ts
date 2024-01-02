import { Question } from "src/app/models/Question";

export interface QuestionState {
    questions: Question[];
}

export const initialState: QuestionState = {
    questions: []
}