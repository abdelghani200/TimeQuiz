import { createReducer, on } from '@ngrx/store';
import * as QuestionActions from '../actions/question.actions';
import { initialState, QuestionState } from '../state/question.state';

export const questionReducer = createReducer(
    initialState,
    on(QuestionActions.laodQuestionsSuccess, (state, { questions }) => ({ ...state, questions })),
    on(QuestionActions.addQuestion, (state, { question }) => ({ ...state, questions: [...state.questions, question] })),
    on(QuestionActions.updateQuestion, (state, { question }) => {
        const updatedQuestions = state.questions.map(l => (l.id === question.id ? { ...l, ...question } : l));
        return { ...state, levels: updatedQuestions };
    }),
    on(QuestionActions.deleteQuestion, (state, { questionId }) => {
        const updatedQuestions = state.questions.filter(l => l.id !== questionId);
        return { ...state, levels: updatedQuestions };
    }),
    on(QuestionActions.loadQuestionsFailure, (state, { error }) => {
        console.error('Error loading levels:', error);
        return state;
    }),
    on(QuestionActions.resetQuestions, () => initialState)
);


export { QuestionState } from '../state/question.state';