import { createReducer, on } from '@ngrx/store';
import * as ResponseActions from '../actions/reponse.actions';
import { initialState } from '../state/reponse.state';

export const responseReducer = createReducer(
    initialState,
    on(ResponseActions.saveResponse, (state, { response }) => ({ ...state, responses: [...state.responses, response] })),
    on(ResponseActions.saveResponseFailure, (state, { error }) => {
        console.error('Error saving response:', error);
        return state;
    })
);

export { ReponseState } from '../state/reponse.state';
