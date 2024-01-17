import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReponseState } from '../state/reponse.state';



export const selectReponseState = createFeatureSelector<ReponseState>('responses');

export const selectResponses = createSelector(
    selectReponseState,
    (state: ReponseState) => state.responses
);

