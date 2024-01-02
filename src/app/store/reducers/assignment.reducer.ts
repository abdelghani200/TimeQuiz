import { createReducer, on } from '@ngrx/store';
import * as AssignmentActions from '../actions/assignment.actions';
import { initialState, AssignmentState } from '../state/assignment.state';

export const assignmentReducer = createReducer(
    initialState,
    on(AssignmentActions.loadAssignmentsSuccess, (state, { assignments }) => ({ ...state, assignments })),
    on(AssignmentActions.addAssignment, (state, { assignment }) => ({ ...state, assignments: [...state.assignments, assignment] })),
    on(AssignmentActions.updateAssignment, (state, { assignment }) => {
        const updatedAssignments = state.assignments.map(l => (l.id === assignment.id ? { ...l, ...assignment } : l));
        return { ...state, assignments: updatedAssignments };
    }),
    on(AssignmentActions.deleteAssignment, (state, { assignmentId }) => {
        const updatedAssignments = state.assignments.filter(l => l.id !== assignmentId);
        return { ...state, assignments: updatedAssignments };
    }),
    on(AssignmentActions.loadAssignmentsFailure, (state, { error }) => {
        console.error('Error loading assignments:', error);
        return state;
    }),
    on(AssignmentActions.resetAssignments, () => initialState)
);


export { AssignmentState } from '../state/assignment.state';