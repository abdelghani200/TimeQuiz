import { createSelector, createFeatureSelector } from '@ngrx/store';
import { QuestionAndQuizState } from '../state/questionquiz.state';


export const selectQuestionAndQuizState = createFeatureSelector<QuestionAndQuizState>('questionsAndQuiz');

export const selectQuestionAndQuiz = createSelector(
    selectQuestionAndQuizState,
    (state: QuestionAndQuizState) => state.questionsAndQuiz
);

