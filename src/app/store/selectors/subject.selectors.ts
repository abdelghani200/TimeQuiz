import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SubjectState } from '../state/subject.state';


export const selectSubjectState = createFeatureSelector<SubjectState>('subjects');

export const selectSubjects = createSelector(
    selectSubjectState,
    (state: SubjectState) => state.subjects
);

