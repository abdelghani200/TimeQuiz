import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { LevelService } from 'src/app/services/level.service';
import * as LevelActions from '../actions/level.actions';


@Injectable()
export class LevelEffects {

    constructor(
        private actions$: Actions,
        private levelService: LevelService
    ) { }

    loadLevels$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LevelActions.loadLevels),
            exhaustMap(() => {
                return this.levelService.getLevels().pipe(
                    tap(levels => console.log('Received levels in effect:', levels)),
                    map((levels) => LevelActions.loadLevelsSuccess({ levels })),
                    catchError((error) => {
                        console.error('Error fetching levels:', error);
                        return of(LevelActions.loadLevelsFailure({ error }));
                    })
                );
            })
        );
    });
    

}
