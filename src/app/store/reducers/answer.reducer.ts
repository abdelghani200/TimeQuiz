import { createReducer, on } from '@ngrx/store';
import * as AnswerActions from '../actions/answer.actions';
import { initialState, AnswerState } from '../state/answer.state';

export const answerReducer = createReducer(
    initialState,
    on(AnswerActions.loadAnswersSuccess, (state, { answers }) => ({ ...state, answers })),
    on(AnswerActions.addAnswer, (state, { answer }) => ({ ...state, answers: [...state.answers, answer] })),
    on(AnswerActions.updateAnswer, (state, { answer }) => {
        const updatedAnswers = state.answers.map(l => (l.id === answer.id ? { ...l, ...answer } : l));
        return { ...state, answers: updatedAnswers };
    }),
    on(AnswerActions.deleteAnswer, (state, { answerId }) => {
        const updatedAnswers = state.answers.filter(l => l.id !== answerId);
        return { ...state, answers: updatedAnswers };
    }),
    on(AnswerActions.loadAnswersFailure, (state, { error }) => {
        console.error('Error loading answers:', error);
        return state;
    }),
    on(AnswerActions.resetAnswers, () => initialState)
);


export { AnswerState } from '../state/answer.state';