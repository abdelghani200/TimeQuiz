import { createAction, props } from "@ngrx/store";
import { Subject } from "src/app/models/Subject";

export const loadSubjects = createAction('[Subject] load Subjects');

export const loadSubjectsSuccess = createAction('[Subject] Load Subjects Success', props<{ subjects: Subject[] }>());
export const addSubject = createAction('[Subject] Add Subject', props<{ subject: Subject }>());
export const updateSubject = createAction('[Subject] Update Subject', props<{ subject: Subject }>());
export const deleteSubject = createAction('[Subject] Delete Subject', props<{ subjectId: number }>());
export const loadSubjectsFailure = createAction('[Subject] Load Subjects Failure', props<{ error: any }>());
export const resetSubjects = createAction('[Subject] Reset Subjects');