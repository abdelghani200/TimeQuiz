import { createAction, props } from "@ngrx/store";
import { QuestionToQuiz } from "src/app/models/QuestionToQuiz";

export const LoadQuestionToQuiz = createAction('[QuestionAndQuiz] Load Questions of Quiz', props<{ id: number }>());
export const LoadQuestionToQuizSuccess = createAction('[QuestionAndQuiz] Load Questions of Quiz Success', props<{ questionsAndQuiz: QuestionToQuiz[] }>());
export const LoadQuestionToQuizFailure = createAction('[QuestionAndQuiz] Load Questions of Quiz Failure', props<{ error: any }>());
export const ToQuiz = createAction('[QuestionAndQuiz] To Quiz', props<{ questionsAndQuiz: QuestionToQuiz }>());
export const ToQuizSuccess = createAction('[QuestionAndQuiz] To Quiz Success', props<{ questionsAndQuizzees: QuestionToQuiz[] }>());
