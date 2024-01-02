import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AnswerState } from '../state/answer.state';


export const selectAnswerState = createFeatureSelector<AnswerState>('answers');

export const selectAnswers = createSelector(
    selectAnswerState,
    (state: AnswerState) => state.answers
);

