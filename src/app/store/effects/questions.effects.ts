import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap, mergeMap } from 'rxjs/operators';
import * as QuestionActions from '../actions/question.actions';
import { QuestionService } from 'src/app/services/question.service';
import { SweetAlertService } from 'src/app/services/sweetAlert/sweet-alert.service';


@Injectable()
export class QuestionEffects {

    constructor(
        private actions$: Actions,
        private questionService: QuestionService,
        private sweetAlertService: SweetAlertService
    ) { }

    loadQuestions$ = createEffect(() => {
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
    

    addQuestion$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionActions.addQuestion),
            mergeMap((action) => {
                return this.questionService.addQuestion(action.question).pipe(
                    map(() => {
                        this.sweetAlertService.showSuccess('Success', 'Questions added successfully');
                        return QuestionActions.loadsQuestions(); // Reload levels after adding
                    }),
                    catchError((error) => of(QuestionActions.loadQuestionsFailure({ error })))
                );
            })
        );
    });

    updateQuestion$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionActions.updateQuestion),
            mergeMap((action) => {
                return this.questionService.updateQuestion(action.question).pipe(
                    map(() => QuestionActions.loadsQuestions()), // Reload questions after updating
                    catchError((error) => of(QuestionActions.loadQuestionsFailure({ error })))
                );
            })
        );
    });

    deleteQuestion$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionActions.deleteQuestion),
            mergeMap((action) => {
                return this.questionService.deleteQuestion(action.questionId).pipe(
                    map(() => {
                        this.sweetAlertService.showDeleteSuccess();
                        return QuestionActions.loadsQuestions();
                    }),
                    catchError((error) => {
                        this.sweetAlertService.showError('Error', 'Failed to delete question');
                        return of(QuestionActions.loadQuestionsFailure({ error }));
                    })
                );
            })
        );
    });

}
