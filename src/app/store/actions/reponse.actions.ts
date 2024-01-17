import { createAction, props } from '@ngrx/store';
import { Response } from 'src/app/models/Response';

export const saveResponse = createAction('[Response] Save Response', props<{ response: Response }>());
export const saveResponseSuccess = createAction('[Response] Save Response Success');
export const saveResponseFailure = createAction('[Response] Save Response Failure', props<{ error: any }>());
