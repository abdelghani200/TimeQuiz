import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as QuestionActions from '../actions/question.actions';
import { QuestionService } from 'src/app/services/question.service';


@Injectable()
export class QuestionEffects {

    constructor(
        private actions$: Actions,
        private questionService: QuestionService
    ) { }

    loadSubjects$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionActions.loadsQuestions),
            exhaustMap(() => {
                return this.questionService.getQuestions().pipe(
                    tap(subjects => console.log('Received levels in effect:', subjects)),
                    map((questions) => QuestionActions.laodQuestionsSuccess({ questions })),
                    catchError((error) => {
                        console.error('Error fetching questions:', error);
                        return of(QuestionActions.loadQuestionsFailure({ error }));
                    })
                );
            })
        );
    });
    

}
