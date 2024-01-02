import { createAction, props } from "@ngrx/store";
import { Answer } from "src/app/models/Answer";

export const loadAnswers = createAction('[Answer] load Answers');

export const loadAnswersSuccess = createAction('[Answer] Load Answers Success', props<{ answers: Answer[] }>());
export const addAnswer = createAction('[Answer] Add Answer', props<{ answer: Answer }>());
export const updateAnswer = createAction('[Answer] Update Answer', props<{ answer: Answer }>());
export const deleteAnswer = createAction('[Answer] Delete Answer', props<{ answerId: number }>());
export const loadAnswersFailure = createAction('[Answer] Load answers Failure', props<{ error: any }>());
export const resetAnswers = createAction('[Answer] Reset answers');