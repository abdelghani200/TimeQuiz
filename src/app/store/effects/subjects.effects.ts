import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as SubjectActions from '../actions/subject.actions';
import { SubjectService } from 'src/app/services/subject.service';


@Injectable()
export class SubjectEffects {

    constructor(
        private actions$: Actions,
        private subjectService: SubjectService
    ) { }

    loadSubjects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SubjectActions.loadSubjects),
            exhaustMap(() => {
                return this.subjectService.getSubjects().pipe(
                    tap(subjects => console.log('Received levels in effect:', subjects)),
                    map((subjects) => SubjectActions.loadSubjectsSuccess({ subjects })),
                    catchError((error) => {
                        console.error('Error fetching subjects:', error);
                        return of(SubjectActions.loadSubjectsFailure({ error }));
                    })
                );
            })
        );
    });
    

}
