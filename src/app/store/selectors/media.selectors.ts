import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MediaState } from '../state/media.state';


export const selectMediaState = createFeatureSelector<MediaState>('medias');

export const selectMedias = createSelector(
    selectMediaState,
    (state: MediaState) => state.medias
);

