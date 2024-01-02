import { createSelector, createFeatureSelector } from '@ngrx/store';
import { QuizState } from '../state/quiz.state';


export const selectQuizState = createFeatureSelector<QuizState>('quizzs');

export const selectQuiz = createSelector(
    selectQuizState,
    (state: QuizState) => state.quizzs
);

