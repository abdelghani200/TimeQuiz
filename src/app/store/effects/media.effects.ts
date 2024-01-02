import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as MediaActions from '../actions/media.actions';
import { TeacherService } from 'src/app/services/Teacher/teacher.service';
import { MediasService } from 'src/app/services/medias/medias.service';


@Injectable()
export class MediaEffects {

    constructor(
        private actions$: Actions,
        private mediaService: MediasService
    ) { }

    loadMedias$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MediaActions.loadMedias),
            exhaustMap(() => {
                return this.mediaService.getMedias().pipe(
                    tap(medias => console.log('Received medias in effect:', medias)),
                    map((medias) => MediaActions.loadMediasSuccess({ medias })),
                    catchError((error) => {
                        console.error('Error fetching medias:', error);
                        return of(MediaActions.loadMediasFailure({ error }));
                    })
                );
            })
        );
    });


    deleteMedia$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(MediaActions.deleteMedia),
            exhaustMap((action) => {
                return this.mediaService.deleteMedias(action.mediaId).pipe(
                    tap(() => console.log('Media deleted successfully')),
                    map(() => MediaActions.deleteMedia({ mediaId: action.mediaId })),
                    catchError((error) => {
                        console.error('Error deleting media:', error);
                        return of(MediaActions.deleteMediaFailure({ error }));
                    })
                );
            })
        );
    });





}
