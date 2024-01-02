import { createAction, props } from "@ngrx/store";
import { Question } from "src/app/models/Question";

export const loadsQuestions = createAction('[Question] load Questions');

export const laodQuestionsSuccess = createAction('[Question] Load Questions Success', props<{ questions: Question[] }>());
export const addQuestion = createAction('[Question] Add Question', props<{ question: Question }>());
export const updateQuestion = createAction('[Question] Update Question', props<{ question: Question }>());
export const deleteQuestion = createAction('[Question] Delete Question', props<{ questionId: number }>());
export const loadQuestionsFailure = createAction('[Question] Load Questions Failure', props<{ error: any }>());
export const resetQuestions = createAction('[Question] Reset Questions');