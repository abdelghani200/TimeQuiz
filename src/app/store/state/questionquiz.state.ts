import { QuestionToQuiz } from 'src/app/models/QuestionToQuiz';

export interface QuestionAndQuizState {
    questionsAndQuiz: QuestionToQuiz[];
}

export const initialState: QuestionAndQuizState = {
    questionsAndQuiz: [],
};