import { createAction, props } from "@ngrx/store";
import { Teacher } from "src/app/models/Teacher";

export const loadTeachers = createAction('[Teachers] load Teachers');

export const loadTeachersSuccess = createAction('[Teacher] Load Teachers Success', props<{ teachers: Teacher[] }>());
export const addTeacher = createAction('[Teacher] Add Level', props<{ teacher: Teacher }>());
export const updateTeacher = createAction('[Teacher] Update Teacher', props<{ teacher: Teacher }>());
export const deleteTeacher = createAction('[Teacher] Delete Teacher', props<{ teacherId: number }>());
export const loadTeachersFailure = createAction('[Teacher] Load Teachers Failure', props<{ error: any }>());
export const resetTeachers = createAction('[Teacher] Reset Teachers');
export const deleteTeacherFailure = createAction(
    '[Teacher] Delete Teacher Failure',
    props<{ error: any }>()
);

export const updateTeacherFailure = createAction(
    '[Teacher] Update Teacher Failure',
    props<{ error: any }>()
);