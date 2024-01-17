import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap, mergeMap } from 'rxjs/operators';
import { LevelService } from 'src/app/services/level.service';
import * as LevelActions from '../actions/level.actions';
import { SweetAlertService } from 'src/app/services/sweetAlert/sweet-alert.service';

@Injectable()
export class LevelEffects {

    constructor(
        private actions$: Actions,
        private levelService: LevelService,
        private sweetAlertService: SweetAlertService
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
                        this.sweetAlertService.showError('Error', 'Failed to fetch levels');
                        return of(LevelActions.loadLevelsFailure({ error }));
                    })
                );
            })
        );
    });

    addLevel$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LevelActions.addLevel),
            mergeMap((action) => {
                return this.levelService.addLevel(action.level).pipe(
                    map(() => {
                        this.sweetAlertService.showSuccess('Success', 'Level added successfully');
                        return LevelActions.loadLevels(); // Reload levels after adding
                    }),
                    catchError((error) => {
                        this.sweetAlertService.showError('Error', 'Failed to add level');
                        return of(LevelActions.loadLevelsFailure({ error }));
                    })
                );
            })
        );
    });

    updateLevel$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LevelActions.updateLevel),
            mergeMap((action) => {
                return this.levelService.updateLevel(action.level).pipe(
                    map(() => {
                        this.sweetAlertService.showUpdateSuccess();
                        return LevelActions.loadLevels(); // Reload levels after updating
                    }),
                    catchError((error) => {
                        this.sweetAlertService.showError('Error', 'Failed to update level');
                        return of(LevelActions.loadLevelsFailure({ error }));
                    })
                );
            })
        );
    });

    deleteLevel$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LevelActions.deleteLevel),
            mergeMap((action) => {
                return this.levelService.deleteLevel(action.levelId).pipe(
                    map(() => {
                        this.sweetAlertService.showDeleteSuccess();
                        return LevelActions.loadLevels(); // Reload levels after deleting
                    }),
                    catchError((error) => {
                        this.sweetAlertService.showError('Error', 'Failed to delete level');
                        return of(LevelActions.loadLevelsFailure({ error }));
                    })
                );
            })
        );
    });

}
