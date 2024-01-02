import { createAction, props } from '@ngrx/store';
import { Validation } from 'src/app/models/Validation';


export const validateQuestion = createAction('[Validation] Validate Question', props<{ validation: Validation }>());
export const validateQuestionSuccess = createAction('[Validation] Validate Question Success', props<{ validations: Validation[] }>());
export const getAllValidations = createAction('[Validation] Get All Validations');
export const getAllValidationsSuccess = createAction('[Validation] Get All Validations Success', props<{ validations: Validation[] }>());
