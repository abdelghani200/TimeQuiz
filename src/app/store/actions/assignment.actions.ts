import { createAction, props } from "@ngrx/store";
import { Assignment } from "src/app/models/Assignment";

export const loadAssignments = createAction('[Assignments] load Assignments');

export const loadAssignmentsSuccess = createAction('[Assignment] Load Assignments Success', props<{ assignments: Assignment[] }>());
export const addAssignment = createAction('[Assignment] Add Assignment', props<{ assignment: Assignment }>());
export const updateAssignment = createAction('[Assignment] Update Assignment', props<{ assignment: Assignment }>());
export const deleteAssignment = createAction('[Assignment] Delete Assignment', props<{ assignmentId: number }>());
export const loadAssignmentsFailure = createAction('[Assignment] Load Assignments Failure', props<{ error: any }>());
export const resetAssignments = createAction('[Assignment] Reset Assignments');
export const deleteAssignmentsFailure = createAction(
    '[Assignment] Delete Assignment Failure',
    props<{ error: any }>()
);

export const updateAssignmentFailure = createAction(
    '[Assignment] Update Assignment Failure',
    props<{ error: any }>()
);