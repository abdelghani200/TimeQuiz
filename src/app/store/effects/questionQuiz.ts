import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap, mergeMap } from 'rxjs/operators';
import * as QuestionQuiz from '../actions/questionQuiz.actions';
import { QuestionAndQuizService } from 'src/app/services/question-and-quiz.service';


@Injectable()
export class QuestionQuizEffects {

    constructor(
        private actions$: Actions,
        private questionAndQuiz: QuestionAndQuizService
    ) { }


    loadQuestionsForQuiz$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(QuestionQuiz.LoadQuestionToQuiz),
            exhaustMap(action =>
                this.questionAndQuiz.getQuestionToQuiz(action.id).pipe(
                    tap(questionsAndQuiz => console.log('Received questions in effect:', questionsAndQuiz)),
                    map((questionsAndQuiz) => QuestionQuiz.LoadQuestionToQuizSuccess({ questionsAndQuiz })),
                    catchError(error => of(QuestionQuiz.LoadQuestionToQuizFailure({ error })))
                )
            )
        );
    });


    toQuiz$ = createEffect(() =>
        this.actions$.pipe(
            ofType(QuestionQuiz.ToQuiz),
            mergeMap(action =>
                this.questionAndQuiz.QuestionToQuiz(action.questionsAndQuiz).pipe(
                    map(questionsAndQuizzees => QuestionQuiz.ToQuizSuccess({ questionsAndQuizzees }))
                )
            )
        )
    );


}
