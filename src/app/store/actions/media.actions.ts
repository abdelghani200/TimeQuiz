import { createAction, props } from "@ngrx/store";
import { Media } from "src/app/models/Media";

export const loadMedias = createAction('[Medias] load Medias');

export const loadMediasSuccess = createAction('[Media] Load Medias Success', props<{ medias: Media[] }>());
export const addMedia = createAction('[Media] Add Media', props<{ media: Media }>());
export const deleteMedia = createAction('[Media] Delete Media', props<{ mediaId: number }>());
export const loadMediasFailure = createAction('[Media] Load Media Failure', props<{ error: any }>());
export const resetMedias = createAction('[Media] Reset Medias');
export const deleteMediaFailure = createAction(
    '[Media] Delete Media Failure',
    props<{ error: any }>()
);
