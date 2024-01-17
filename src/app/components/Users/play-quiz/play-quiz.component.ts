
import { Component, ElementRef, OnInit, Renderer2, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { map, take, mergeMap, filter } from 'rxjs/operators';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import * as ValidationActions from '../../../store/actions/validation.actions';
import * as QuestionQuizActions from '../../../store/actions/questionQuiz.actions';
import { AppState } from 'src/app/store/reducers';
import { selectQuestionAndQuiz } from 'src/app/store/selectors/questionAndQuiz.selectors';
import { Validation } from 'src/app/models/Validation';
import { selectValidations } from 'src/app/store/selectors/validation.selectors';
import { Answer } from 'src/app/models/Answer';
import { Question } from 'src/app/models/Question';
import { Response } from 'src/app/models/Response';
import * as ResponseActions from '../../../store/actions/reponse.actions';
import { QuestionToQuiz } from 'src/app/models/QuestionToQuiz';
import { ReponseService } from 'src/app/services/reponse/reponse.service';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, :leave', [
        animate(300)
      ])
    ])
  ]
})
export class PlayQuizComponent implements OnInit {
  questionsAndQuiz$: Observable<QuestionToQuiz[]>;
  validations$: Observable<Validation[]>;
  currentQuestionIndex: number = 0;
  selectedAnswer: any = null;
  quizInProgress: boolean = false;
  currentQuestionAnswers: Validation[] = [];
  selectedAnswers: { [questionId: number]: Answer } = {};
  showLeaderboardPopup: boolean = false;
  finalScore: number | null = null;
  userAnswers: string[] = [];

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private reponseService: ReponseService
  ) {
    this.questionsAndQuiz$ = this.store.pipe(select(selectQuestionAndQuiz));
    this.validations$ = this.store.pipe(select(selectValidations));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['assignQuizId'];
    this.store.dispatch(QuestionQuizActions.LoadQuestionToQuiz({ id: id }));
    this.store.dispatch(ValidationActions.getAllValidations());

    this.questionsAndQuiz$.subscribe(questionsAndQuiz => {
      console.log('Quizzes:', questionsAndQuiz);
      if (questionsAndQuiz.length > 0) {
        this.quizInProgress = true;
        this.setupAnswersObservable().subscribe(answers => {
          this.currentQuestionAnswers = answers;
          console.log('Answers:', this.currentQuestionAnswers);
        });
      }
    });

    this.validations$.subscribe(validations => {
      console.log('validations:', validations);
    });
  }

  setupAnswersObservable(): Observable<Validation[]> {
    return this.questionsAndQuiz$.pipe(
      take(1),
      mergeMap(questionsAndQuiz => {
        const currentQuestion = questionsAndQuiz[this.currentQuestionIndex]?.question;
        return this.validations$.pipe(
          map(validations => validations.filter(validation => validation.question.id === currentQuestion?.id)),
          filter(answers => !!answers)
        );
      })
    );
  }

  nextQuestion() {
    console.log('Entering nextQuestion method');
    this.questionsAndQuiz$.pipe(take(1)).subscribe(questionsAndQuiz => {
      if (this.currentQuestionIndex < questionsAndQuiz.length - 1) {
        this.selectedAnswer = this.selectedAnswers[questionsAndQuiz[this.currentQuestionIndex]?.question.id];
        this.currentQuestionIndex++;
        this.setupAnswersObservable().subscribe(answers => {
          this.currentQuestionAnswers = answers;
          console.log('Answers:', this.currentQuestionAnswers);
        });

        this.saveSelectedAnswer();

      } else {
        this.quizInProgress = false;
        this.showLeaderboardPopup = true;
        this.calculateTotalScore().subscribe(result => {
          this.finalScore = result.points;
          this.userAnswers = result.correct ? ['Réponse correcte'] : ['Réponse incorrecte'];
        });
      }
    });
    this.cdr.detectChanges();
  }

  saveSelectedAnswer(): void {
    const currentQuestion = this.currentQuestionAnswers[0]?.question;
    if (currentQuestion) {
      const assignTestId = +this.route.snapshot.params['assignQuizId'];

      this.currentQuestionAnswers.forEach(validation => {
        const points = validation.points || 0;
        console.log(points)

        const response: Response = {
          questionResult: points,
          assignQuizId: assignTestId,
          answerId: validation.answer.id,
          questionId: validation.question.id
        };

        this.store.dispatch(ResponseActions.saveResponse({ response })
        );
      });
    }
  }

  selectAnswer(answer: any) {
    this.selectedAnswer = answer;

    this.questionsAndQuiz$.pipe(take(1)).subscribe(questionsAndQuiz => {
      const currentQuestion = questionsAndQuiz[this.currentQuestionIndex]?.question;
      if (currentQuestion) {
        this.selectedAnswers[currentQuestion.id] = answer.answer;
        this.selectedAnswers[currentQuestion.id] = answer.points;
      }
    });
  }

  getAnswerStyleClass(answer: Validation): string {
    const colors = ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500'];
    const colorIndex = this.currentQuestionAnswers.indexOf(answer) % colors.length;
    const baseClass = colors[colorIndex];

    return this.selectedAnswer === answer ? `${baseClass} button-selected` : baseClass;
  }

  calculateTotalScore(): Observable<{ points: number, correct: boolean }> {
    return combineLatest([this.questionsAndQuiz$, this.validations$]).pipe(
      take(1),
      map(([questionsAndQuiz, validations]) => {
        let totalPoints = 0;
        let allCorrect = true;

        questionsAndQuiz.forEach(q => {
          const userAnswer = this.selectedAnswers[q.question.id];

          if (userAnswer) {
            const matchingValidation = validations.find(
              v => v.question.id === q.question.id && v.answer.id === userAnswer.id
            );

            if (matchingValidation) {
              totalPoints += matchingValidation.points;
            } else {
              allCorrect = false;
            }
          }
        });

        return { points: totalPoints, correct: allCorrect };
      })
    );
  }

  navigateToListQuiz() {
    return this.router.navigate(['/quizList']);
  }
}


























// import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
// import { Store, select } from '@ngrx/store';
// import { Observable, from } from 'rxjs';
// import * as ValidationActions from '../../../store/actions/validation.actions'
// import { AppState } from 'src/app/store/reducers';
// import * as QuestionQuizActions from '../../../store/actions/questionQuiz.actions'
// import { QuestionToQuiz } from 'src/app/models/QuestionToQuiz';
// import { selectQuestionAndQuiz } from 'src/app/store/selectors/questionAndQuiz.selectors';
// import { Validation } from 'src/app/models/Validation';
// import { selectValidations } from 'src/app/store/selectors/validation.selectors';
// import { map, take, filter, mergeMap } from 'rxjs/operators';
// import { combineLatest } from 'rxjs';
// import { trigger, state, style, animate, transition } from '@angular/animations';
// import { ActivatedRoute, Router } from '@angular/router';
// import * as ResponseActions from '../../../store/actions/reponse.actions'
// import { ChangeDetectorRef } from '@angular/core';
// import { Answer } from 'src/app/models/Answer';
// import { Question } from 'src/app/models/Question';
// import { Response } from 'src/app/models/Response';


// @Component({
//   selector: 'app-play-quiz',
//   templateUrl: './play-quiz.component.html',
//   styleUrls: ['./play-quiz.component.css'],
//   animations: [
//     trigger('fadeInOut', [
//       state('void', style({
//         opacity: 0
//       })),
//       transition(':enter, : leave', [
//         animate(300)
//       ])
//     ])
//   ]
// })
// export class PlayQuizComponent implements OnInit {

//   questionsAndQuiz$: Observable<QuestionToQuiz[]>;
//   validations$: Observable<Validation[]>

//   currentQuestionIndex: number = 0;
//   selectedAnswer: any = null;
//   totalScore: number = 0;
//   quizInProgress: boolean = false;
//   currentQuestionAnswers$!: Observable<Validation[]>;
//   currentQuestionAnswers: Validation[] = [];
//   selecteAnswers: { answer: Answer; question: Question; points?: number }[] = [];

//   finalScore: number | null = null;
//   userAnswers: string[] = [];

//   selectedAnswers: { [questionId: number]: Validation | undefined } = {};


//   showLeaderboardPopup: boolean = false;

//   constructor(private store: Store<AppState>, private router: Router, private cdr: ChangeDetectorRef, private el: ElementRef, private route: ActivatedRoute) {
//     this.questionsAndQuiz$ = this.store.pipe(select(selectQuestionAndQuiz));
//     this.validations$ = this.store.pipe(select(selectValidations))
//   }

//   ngOnInit(): void {
//     const id = this.route.snapshot.params['id'];
//     console.log(id)
//     this.store.dispatch(QuestionQuizActions.LoadQuestionToQuiz({ id: id }));

//     this.store.dispatch(ValidationActions.getAllValidations());
//     this.questionsAndQuiz$.subscribe(questionsAndQuiz => {
//       console.log('Quizzes:', questionsAndQuiz);
//       if (questionsAndQuiz.length > 0) {
//         this.quizInProgress = true;
//         this.setupAnswersObservable().subscribe(answers => {
//           this.currentQuestionAnswers = answers;
//           console.log('Answers:', this.currentQuestionAnswers);
//         });
//       }
//     });
//     this.validations$.subscribe(validations => {
//       console.log('validations:', validations);
//     });

//   }

//   setupAnswersObservable(): Observable<Validation[]> {
//     return this.questionsAndQuiz$.pipe(
//       take(1),
//       mergeMap(questionsAndQuiz => {
//         const currentQuestion = questionsAndQuiz[this.currentQuestionIndex]?.question;
//         return this.validations$.pipe(
//           map(validations => validations.filter(validation => validation.question.id === currentQuestion?.id)),
//           filter(answers => !!answers)
//         );
//       })
//     );
//   }

//   nextQuestion() {
//     console.log('Entering nextQuestion method');
//     this.questionsAndQuiz$.pipe(take(1)).subscribe(questionsAndQuiz => {
//       if (this.currentQuestionIndex < questionsAndQuiz.length - 1) {
//         this.selectedAnswer = this.selectedAnswers[questionsAndQuiz[this.currentQuestionIndex]?.question.id];
//         this.currentQuestionIndex++;
//         this.setupAnswersObservable().subscribe(answers => {
//           this.currentQuestionAnswers = answers;
//           console.log('Answers:', this.currentQuestionAnswers);
//           // console.log('Answers:', this.selectedAnswer);
//         });

//         this.saveSelectedAnswer()

//       } else {
//         this.quizInProgress = false;
//         this.showLeaderboardPopup = true;
//         this.calculateTotalScore().subscribe(result => {
//           this.finalScore = result.points;
//           this.userAnswers = result.correct ? ['Réponse correcte'] : ['Réponse incorrecte'];
//         });
//       }
//     });
//     this.cdr.detectChanges();
//   }



//   saveSelectedAnswer(): void {
//     const selectedAnswers = this.selecteAnswers;
//     if (selectedAnswers && selectedAnswers.length > 0) {
//       const currentQuestion = selectedAnswers[this.currentQuestionIndex]?.question;
//       const assignTestId = +this.route.snapshot.params['assignTestId'];

//       if (currentQuestion && currentQuestion.answers) {
//         currentQuestion.answers.forEach((selectedAnswer: Answer) => {
//           const points = selectedAnswer.points || 0;

//           const response: Response = {
//             questionResult: points,
//             assignTest: {
//               assignTestId: assignTestId,
//             },
//             validation: {
//               answer: selectedAnswer,
//               question: currentQuestion,
//               points: points,
//             },
//           };

//           this.reponseService.addReponse(response).subscribe(
//             (response) => {
//               console.log('Response saved successfully:', response);
//             },
//             (error) => {
//               console.error('Error saving response:', error);
//             }
//           );
//         });
//       }
//     }
//   }




//   selectAnswer(answer: any) {
//     this.selectedAnswer = answer;

//     this.questionsAndQuiz$.pipe(take(1)).subscribe(questionsAndQuiz => {
//       const currentQuestion = questionsAndQuiz[this.currentQuestionIndex]?.question;
//       if (currentQuestion) {
//         this.selectedAnswers[currentQuestion.id] = answer.answer;
//         this.selectedAnswers[currentQuestion.id] = answer.points;
//       }
//     });
//   }


//   getAnswerStyleClass(answer: Validation): string {
//     const colors = ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500'];
//     const colorIndex = this.currentQuestionAnswers.indexOf(answer) % colors.length;
//     const baseClass = colors[colorIndex];

//     return this.selectedAnswer === answer ? `${baseClass} button-selected` : baseClass;
//   }

//   calculateTotalScore(): Observable<{ points: number, correct: boolean }> {
//     return combineLatest([this.questionsAndQuiz$, this.validations$]).pipe(
//       take(1),
//       map(([questionsAndQuiz, validations]) => {
//         let totalPoints = 0;
//         let allCorrect = true;

//         questionsAndQuiz.forEach((q, index) => {
//           const userAnswer = this.selectedAnswers[q.question.id];

//           if (userAnswer) {
//             const matchingValidation = validations.find(
//               v => v.question.id === q.question.id && v.answer.id === userAnswer.answer.id
//             );

//             if (matchingValidation) {
//               totalPoints += matchingValidation.points;
//             } else {
//               allCorrect = false;
//             }
//           }
//         });

//         return { points: totalPoints, correct: allCorrect };
//       })
//     );
//   }


//   navigateToListQuiz() {
//     return this.router.navigate(['/quizList']);
//   }




// }
