import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ValidationState } from '../state/validation.state';



const selectValidationState = createFeatureSelector<ValidationState>('validation');

export const selectValidations = createSelector(
    selectValidationState,
    (state: ValidationState) => state.validations
);
