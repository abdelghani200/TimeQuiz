import { Action, createReducer, on } from '@ngrx/store';
import * as QuestionAndQuizActions from '../actions/questionQuiz.actions';
import { initialState } from '../state/questionquiz.state';
import { state } from '@angular/animations';

export const questionAndQuizReducer = createReducer(
    initialState,
    on(QuestionAndQuizActions.LoadQuestionToQuizSuccess, (state, { questionsAndQuiz }) => ({
        ...state,
        questionsAndQuiz: questionsAndQuiz,
    })),
    on(QuestionAndQuizActions.ToQuiz, (state, { questionsAndQuiz })=>({
        ...state
    }))
);


export { QuestionAndQuizState } from '../state/questionquiz.state';
