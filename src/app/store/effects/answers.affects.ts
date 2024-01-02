import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AnswerService } from 'src/app/services/answer.service';
import * as AnswerActions from '../actions/answer.actions';


@Injectable()
export class AnswerEffects {

    constructor(
        private actions$: Actions,
        private answerService: AnswerService
    ) { }

    loadLevels$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AnswerActions.loadAnswers),
            exhaustMap(() => {
                return this.answerService.getAnswers().pipe(
                    tap(answers => console.log('Received levels in effect:', answers)),
                    map((answers) => AnswerActions.loadAnswersSuccess({ answers })),
                    catchError((error) => {
                        console.error('Error fetching answers:', error);
                        return of(AnswerActions.loadAnswersFailure({ error }));
                    })
                );
            })
        );
    });
    

}
