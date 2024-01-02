import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TeacherState } from '../state/teacher.state';


export const selectTeacherState = createFeatureSelector<TeacherState>('teachers');

export const selectTeachers = createSelector(
    selectTeacherState,
    (state: TeacherState) => state.teachers
);

