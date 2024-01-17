import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap, mergeMap } from 'rxjs/operators';
import { AnswerService } from 'src/app/services/answer.service';
import * as AnswerActions from '../actions/answer.actions';
import { SweetAlertService } from 'src/app/services/sweetAlert/sweet-alert.service';


@Injectable()
export class AnswerEffects {

    constructor(
        private actions$: Actions,
        private answerService: AnswerService,
        private sweetAlertService: SweetAlertService
    ) { }

    loadAnswers$ = createEffect(() => {
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
    

    addAnswer$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AnswerActions.addAnswer),
            mergeMap((action) => {
                return this.answerService.addAnswer(action.answer).pipe(
                    map(() => {
                        this.sweetAlertService.showSuccess('Success', 'Level added successfully');
                        return AnswerActions.loadAnswers(); // Reload levels after adding
                    }),
                    catchError((error) => {
                        this.sweetAlertService.showError('Error', 'Failed to add level');
                        return of(AnswerActions.loadAnswersFailure({ error }));
                    })
                );
            })
        );
    });

    updateLevel$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AnswerActions.updateAnswer),
            mergeMap((action) => {
                return this.answerService.updateAnswer(action.answer).pipe(
                    map(() => {
                        this.sweetAlertService.showUpdateSuccess();
                        return AnswerActions.loadAnswers(); // Reload levels after updating
                    }),
                    catchError((error) => {
                        this.sweetAlertService.showError('Error', 'Failed to update level');
                        return of(AnswerActions.loadAnswersFailure({ error }));
                    })
                );
            })
        );
    });

    deleteLevel$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AnswerActions.deleteAnswer),
            mergeMap((action) => {
                return this.answerService.deleteAnswer(action.answerId).pipe(
                    map(() => {
                        this.sweetAlertService.showDeleteSuccess();
                        return AnswerActions.loadAnswers(); // Reload levels after deleting
                    }),
                    catchError((error) => {
                        this.sweetAlertService.showError('Error', 'Failed to delete level');
                        return of(AnswerActions.loadAnswersFailure({ error }));
                    })
                );
            })
        );
    });

}
