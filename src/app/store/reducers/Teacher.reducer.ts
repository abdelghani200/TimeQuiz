import { createReducer, on } from '@ngrx/store';
import * as TeacherActions from '../actions/teacher.actions';
import { initialState, TeacherState } from '../state/teacher.state';

export const teacherReducer = createReducer(
    initialState,
    on(TeacherActions.loadTeachersSuccess, (state, { teachers }) => ({ ...state, teachers })),
    on(TeacherActions.addTeacher, (state, { teacher }) => ({ ...state, teachers: [...state.teachers, teacher] })),
    on(TeacherActions.updateTeacher, (state, { teacher }) => {
        const updatedTeachers = state.teachers.map(l => (l.id === teacher.id ? { ...l, ...teacher } : l));
        return { ...state, teachers: updatedTeachers };
    }),
    on(TeacherActions.deleteTeacher, (state, { teacherId }) => {
        const updatedTeachers = state.teachers.filter(l => l.id !== teacherId);
        return { ...state, teachers: updatedTeachers };
    }),
    on(TeacherActions.loadTeachersFailure, (state, { error }) => {
        console.error('Error loading teachers:', error);
        return state;
    }),
    on(TeacherActions.resetTeachers, () => initialState)
);


export { TeacherState } from '../state/teacher.state';