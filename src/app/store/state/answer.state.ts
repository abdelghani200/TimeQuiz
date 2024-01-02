import { Answer } from "src/app/models/Answer";

export interface AnswerState {
    answers: Answer[];
}

export const initialState: AnswerState = {
    answers: [],
};
