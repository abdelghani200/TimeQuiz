import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap, switchMap } from 'rxjs/operators';
import * as QuizActions from '../actions/quiz.actions';
import { QuizService } from 'src/app/services/quiz.service';


@Injectable()
export class QuizEffects {

    constructor(
        private actions$: Actions,
        private quizService: QuizService,
    ) { }

    loadSubjects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuizActions.loadQuizzs),
            exhaustMap(() => {
                return this.quizService.getQuiz().pipe(
                    tap(quizzs => console.log('Received quizzs in effect:', quizzs)),
                    map((quizzs) => QuizActions.loadQuizzsSuccess({ quizzs })),
                    catchError((error) => {
                        console.error('Error fetching subjects:', error);
                        return of(QuizActions.loadQuizzsFailure({ error }));
                    })
                );
            })
        );
    });



}
