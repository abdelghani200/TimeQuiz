import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AssignmentState } from '../state/assignment.state';


export const selectAssignmentState = createFeatureSelector<AssignmentState>('assignments');

export const selectAssignments = createSelector(
    selectAssignmentState,
    (state: AssignmentState) => state.assignments
);

