import { createAction, props } from "@ngrx/store";
import { Quiz } from "src/app/models/Quiz";

export const loadQuizzs = createAction('[Quiz] load Quizzs');

export const loadQuizzsSuccess = createAction('[Quiz] Load Quizzs Success', props<{ quizzs: Quiz[] }>());
export const addQuiz = createAction('[Quiz] Add Level', props<{ quiz: Quiz }>());
export const updateQuiz = createAction('[Quiz] Update Quiz', props<{ quiz: Quiz }>());
export const deleteQuiz = createAction('[Quiz] Delete Quiz', props<{ quizId: number }>());
export const loadQuizzsFailure = createAction('[Quiz] Load Quizzs Failure', props<{ error: any }>());

export const resetQuizzs = createAction('[Quiz] Reset Quizzs');