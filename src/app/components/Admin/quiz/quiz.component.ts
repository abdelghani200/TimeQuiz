import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/models/Quiz';
import * as QuizActions from '../../../store/actions/quiz.actions';
import { AppState } from 'src/app/store/reducers';
import { selectQuiz } from 'src/app/store/selectors/quiz.selectors';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit{

  @Output() ToQuizModalOpen = new EventEmitter<any>();

  quizzes$: Observable<Quiz[]>;
  isDropdownVisible: boolean = false;
  selectedQuiz!: Quiz;
  isToQuizModalOpen = false;

  constructor(private store: Store<AppState>) {
    this.quizzes$ = this.store.pipe(select(selectQuiz));
  }

  ngOnInit(): void {
    this.store.dispatch(QuizActions.loadQuizzs());
  }

  addQuiz(quiz: Quiz) {
    this.store.dispatch(QuizActions.addQuiz({ quiz }));
  }

  updateQuiz(quiz: Quiz) {
    this.store.dispatch(QuizActions.updateQuiz({ quiz }));
  }

  deleteQuiz(quizId: number) {
    this.store.dispatch(QuizActions.deleteQuiz({ quizId }));
  }

  resetQuizzes() {
    this.store.dispatch(QuizActions.resetQuizzs());
  }

  openToQuizModal(quiz: Quiz) {
    this.selectedQuiz = quiz;
    this.isToQuizModalOpen = true;
  }

}
