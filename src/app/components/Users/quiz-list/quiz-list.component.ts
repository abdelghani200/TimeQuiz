import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/models/Quiz';
import { AppState } from 'src/app/store/reducers';
import * as QuizActions from '../../../store/actions/quiz.actions'
import { selectQuiz } from 'src/app/store/selectors/quiz.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit{

  quizzes$: Observable<Quiz[]>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.quizzes$ = this.store.pipe(select(selectQuiz));
  }

  ngOnInit(): void {
    this.store.dispatch(QuizActions.loadQuizzs());
  }

  navigateToPlay(id: number){
    return this.router.navigate(['/playQuiz', id]);
  }

}
