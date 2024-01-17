import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/models/Quiz';
import { AppState } from 'src/app/store/reducers';
import * as AssignmentActions from '../../../store/actions/assignment.actions'
import { Router } from '@angular/router';
import { selectAssignments } from 'src/app/store/selectors/assignment.selectors';
import { Assignment } from 'src/app/models/Assignment';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit{

  quizzes$: Observable<Assignment[]>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.quizzes$ = this.store.pipe(select(selectAssignments));
  }

  ngOnInit(): void {
    this.store.dispatch(AssignmentActions.loadAssignments());
  }

  navigateToPlay(assignQuizId: number){
    return this.router.navigate(['/playQuiz', assignQuizId]);
  }

  getStatus(quiz: Quiz): String{
    const currentDate = new Date();
    const startDate = new Date(quiz.start_Date);
    const endDate = new Date(quiz.end_Date);

    if(currentDate < startDate){
      return 'Programmé';
    }else if (currentDate >= startDate && currentDate <= endDate) {
      return 'En cours';
    } else {
      return 'Fermé';
    }

  }

}
