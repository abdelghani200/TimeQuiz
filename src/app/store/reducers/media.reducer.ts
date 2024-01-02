import { createReducer, on } from '@ngrx/store';
import * as MediaActions from '../actions/media.actions';
import { initialState, MediaState } from '../state/media.state';

export const mediaReducer = createReducer(
    initialState,
    on(MediaActions.loadMediasSuccess, (state, { medias }) => ({ ...state, medias })),
    on(MediaActions.addMedia, (state, { media }) => ({ ...state, medias: [...state.medias, media] })),
    on(MediaActions.deleteMedia, (state, { mediaId }) => {
        const updatedTeachers = state.medias.filter(l => l.id !== mediaId);
        return { ...state, teachers: updatedTeachers };
    }),
    on(MediaActions.loadMediasFailure, (state, { error }) => {
        console.error('Error loading teachers:', error);
        return state;
    }),
    on(MediaActions.resetMedias, () => initialState)
);


export { MediaState } from '../state/media.state';