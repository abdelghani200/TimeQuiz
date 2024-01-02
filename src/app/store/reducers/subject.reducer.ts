import { createReducer, on } from '@ngrx/store';
import * as SubjectActions from '../actions/subject.actions';
import { initialState, SubjectState } from '../state/subject.state';

export const subjectReducer = createReducer(
    initialState,
    on(SubjectActions.loadSubjectsSuccess, (state, { subjects }) => ({ ...state, subjects })),
    on(SubjectActions.addSubject, (state, { subject }) => ({ ...state, subjects: [...state.subjects, subject] })),
    on(SubjectActions.updateSubject, (state, { subject }) => {
        const updatedsubjects = state.subjects.map(l => (l.id === subject.id ? { ...l, ...subject } : l));
        return { ...state, subjects: updatedsubjects };
    }),
    on(SubjectActions.deleteSubject, (state, { subjectId }) => {
        const updatedsubjects = state.subjects.filter(l => l.id !== subjectId);
        return { ...state, subjects: updatedsubjects };
    }),
    on(SubjectActions.loadSubjectsFailure, (state, { error }) => {
        console.error('Error loading subjects:', error);
        return state;
    }),
    on(SubjectActions.resetSubjects, () => initialState)
);


export { SubjectState } from '../state/subject.state';