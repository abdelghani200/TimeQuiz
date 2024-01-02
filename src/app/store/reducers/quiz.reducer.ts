import { createReducer, on } from '@ngrx/store';
import * as QuizActions from '../actions/quiz.actions';
import { initialState, QuizState } from '../state/quiz.state';

export const quizReducer = createReducer(
    initialState,
    on(QuizActions.loadQuizzsSuccess, (state, { quizzs }) => ({ ...state, quizzs })),
    on(QuizActions.addQuiz, (state, { quiz }) => ({ ...state, quizzs: [...state.quizzs, quiz] })),
    on(QuizActions.updateQuiz, (state, { quiz }) => {
        const updatedquizzs = state.quizzs.map(l => (l.id === quiz.id ? { ...l, ...quiz } : l));
        return { ...state, subjects: updatedquizzs };
    }),
    on(QuizActions.deleteQuiz, (state, { quizId }) => {
        const updatedquizzs = state.quizzs.filter(l => l.id !== quizId);
        return { ...state, quizzs: updatedquizzs };
    }),
    on(QuizActions.loadQuizzsFailure, (state, { error }) => {
        console.error('Error loading subjects:', error);
        return state;
    }),
    on(QuizActions.resetQuizzs, () => initialState),
);


export { QuizState } from '../state/quiz.state';


