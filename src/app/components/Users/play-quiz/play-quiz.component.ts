import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ValidationActions from '../../../store/actions/validation.actions'
import { AppState } from 'src/app/store/reducers';
import * as QuestionQuizActions from '../../../store/actions/questionQuiz.actions'
import { QuestionToQuiz } from 'src/app/models/QuestionToQuiz';
import { selectQuestionAndQuiz } from 'src/app/store/selectors/questionAndQuiz.selectors';
import { Validation } from 'src/app/models/Validation';
import { selectValidations } from 'src/app/store/selectors/validation.selectors';
import { map, take, filter, mergeMap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition(':enter, : leave', [
        animate(300)
      ])
    ])
  ]
})
export class PlayQuizComponent implements OnInit {

  questionsAndQuiz$: Observable<QuestionToQuiz[]>;
  validations$: Observable<Validation[]>

  currentQuestionIndex: number = 0;
  selectedAnswer: any = null;
  totalScore: number = 0;
  quizInProgress: boolean = false;
  currentQuestionAnswers$!: Observable<Validation[]>;
  currentQuestionAnswers: Validation[] = [];

  finalScore: number | null = null;
  userAnswers: string[] = [];

  selectedAnswers: { [questionId: number]: Validation } = {};

  showLeaderboardPopup: boolean = false;

  constructor(private store: Store<AppState>, private router: Router, private renderer: Renderer2, private el: ElementRef, private route: ActivatedRoute) {
    this.questionsAndQuiz$ = this.store.pipe(select(selectQuestionAndQuiz));
    this.validations$ = this.store.pipe(select(selectValidations))
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    console.log(id)
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
    this.questionsAndQuiz$.pipe(take(1)).subscribe(questionsAndQuiz => {
      if (this.currentQuestionIndex < questionsAndQuiz.length - 1) {
        this.currentQuestionIndex++;
        this.selectedAnswer = null;
        this.setupAnswersObservable().subscribe(answers => {
          this.currentQuestionAnswers = answers;
          console.log('Answers:', this.currentQuestionAnswers);
        });
      } else {
        this.quizInProgress = false;
        this.showLeaderboardPopup = true;
        this.calculateTotalScore().subscribe(result => {
          this.finalScore = result.points;
          this.userAnswers = result.correct ? ['Réponse correcte'] : ['Réponse incorrecte'];
        });
      }
    });
  }


  selectAnswer(answer: any) {
    this.selectedAnswer = answer;

    this.questionsAndQuiz$.pipe(take(1)).subscribe(questionsAndQuiz => {
      const currentQuestion = questionsAndQuiz[this.currentQuestionIndex]?.question;
      if (currentQuestion) {
        this.selectedAnswers[currentQuestion.id] = answer;
      }
    });
  }


  getAnswerStyleClass(answer: Validation): string {
    const colors = ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500'];
    const colorIndex = this.currentQuestionAnswers.indexOf(answer) % colors.length;
    // return colors[colorIndex];
    const baseClass = colors[colorIndex];

    return this.selectedAnswer === answer ? `${baseClass} button-selected` : baseClass;
  }

  calculateTotalScore(): Observable<{ points: number, correct: boolean }> {
    return combineLatest([this.questionsAndQuiz$, this.validations$]).pipe(
      take(1),
      map(([questionsAndQuiz, validations]) => {
        let totalPoints = 0;
        let allCorrect = true;

        questionsAndQuiz.forEach((q, index) => {
          const userAnswer = this.selectedAnswers[q.question.id];

          if (userAnswer) {
            const matchingValidation = validations.find(
              v => v.question.id === q.question.id && v.answer.id === userAnswer.answer.id
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


  navigateToListQuiz(){
    return this.router.navigate(['/quizList']);
  }

}
