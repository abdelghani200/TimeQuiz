import { Action, createReducer, on } from '@ngrx/store';
import * as ValidationActions from '../../store/actions/validation.actions';
import { Validation } from 'src/app/models/Validation';


export interface ValidationState {
    validations: Validation[];
}

export const initialState: ValidationState = {
    validations: [],
};

export const validationReducer = createReducer(
    initialState,
    on(ValidationActions.validateQuestionSuccess, (state, { validations }) => ({ ...state, validations })),
    on(ValidationActions.getAllValidationsSuccess, (state, { validations }) => ({ ...state, validations })),
);

export function reducer(state: ValidationState | undefined, action: Action) {
    return validationReducer(state, action);
}
