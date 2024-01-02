import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Answer } from 'src/app/models/Answer';
import { FormconfigService } from 'src/app/services/formconfig.service';
import { AppState } from 'src/app/store/reducers';
import { selectAnswers } from 'src/app/store/selectors/answer.selectors';
import * as AnswerActions from '../../../store/actions/answer.actions'

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent {

  answers$: Observable<Answer[]>;

  currentAnswers!: Answer[]

  answers: Answer[] = [];

  showAddForm = false;

  currentPage = 1;
  itemsPerPage = 6;

  selectedQuestion: any;
  
  constructor(private store: Store<AppState>, private fb: FormBuilder, private formConfig: FormconfigService) {
    this.answers$ = this.store.pipe(select(selectAnswers))
  }

  ngOnInit(): void {
    this.store.dispatch(AnswerActions.loadAnswers());
    this.answers$.subscribe(answers => {
      this.currentAnswers = answers;
      this.answers = answers;
      console.log('Questions:', this.currentAnswers)
    })
  }


  editAnswer(answer: Answer){

  }

  deleteAnswer(id: number){

  }


}


