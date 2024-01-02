import { createSelector, createFeatureSelector } from '@ngrx/store';
import { QuestionState } from '../state/question.state';


export const selectQuestionState = createFeatureSelector<QuestionState>('questions');

export const selectQuestions = createSelector(
    selectQuestionState,
    (state: QuestionState) => state.questions
);

