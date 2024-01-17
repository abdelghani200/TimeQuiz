import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ReponseService } from 'src/app/services/reponse/reponse.service';
import * as ResponseActions from '../actions/reponse.actions';
import { tap } from 'rxjs/operators';


@Injectable()
export class ResponseEffects {

    constructor(private actions$: Actions, private responseService: ReponseService) { }

    // saveResponse$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(ResponseActions.saveResponse),
    //         mergeMap(action =>
    //             this.responseService.addResponse(action.response).pipe(
    //                 mergeMap(() => [ResponseActions.saveResponseSuccess()]),
    //                 catchError(error => of(ResponseActions.saveResponseFailure({ error })))
    //             )
    //         )
    //     )
    // );

    saveResponse$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ResponseActions.saveResponse),
            tap(action => console.log('Data sent to saveResponse API:', action.response)),
            mergeMap(action =>
                this.responseService.addResponse(action.response).pipe(
                    mergeMap(() => [ResponseActions.saveResponseSuccess()]),
                    catchError(error => of(ResponseActions.saveResponseFailure({ error })))
                )
            )
        )
    );



}
