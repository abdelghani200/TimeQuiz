import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as TeacherActions from '../actions/teacher.actions';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';


@Injectable()
export class TeacherEffects {

    constructor(
        private actions$: Actions,
        private teacherService: TeacherService
    ) { }

    loadTeachers$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TeacherActions.loadTeachers),
            exhaustMap(() => {
                return this.teacherService.getTeachers().pipe(
                    tap(teachers => console.log('Received levels in effect:', teachers)),
                    map((teachers) => TeacherActions.loadTeachersSuccess({ teachers })),
                    catchError((error) => {
                        console.error('Error fetching teachers:', error);
                        return of(TeacherActions.loadTeachersFailure({ error }));
                    })
                );
            })
        );
    });


    deleteTeacher$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TeacherActions.deleteTeacher),
            exhaustMap((action) => {
                return this.teacherService.deleteTeacher(action.teacherId).pipe(
                    tap(() => console.log('Teacher deleted successfully')),
                    map(() => TeacherActions.deleteTeacher({ teacherId: action.teacherId })),
                    catchError((error) => {
                        console.error('Error deleting teacher:', error);
                        return of(TeacherActions.deleteTeacherFailure({ error }));
                    })
                );
            })
        );
    });


    updateTeacher$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(TeacherActions.updateTeacher),
            exhaustMap((action) => {
                return this.teacherService.updateTeacher(action.teacher).pipe(
                    tap(() => console.log('Teacher updated successfully')),
                    map(() => TeacherActions.updateTeacher({ teacher: action.teacher })),
                    catchError((error) => {
                        console.error('Error updating teacher:', error);
                        return of(TeacherActions.updateTeacherFailure({ error }));
                    })
                );
            })
        );
    });


}
