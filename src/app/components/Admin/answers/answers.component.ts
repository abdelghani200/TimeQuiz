import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  operation: String = 'add'
  aswerForm!: FormGroup;

  selectedAnswer: Answer | null = null;

  currentPage = 1;
  itemsPerPage = 6;

  selectedQuestion: any;

  constructor(private store: Store<AppState>, private fb: FormBuilder, private formConfig: FormconfigService) {
    this.answers$ = this.store.pipe(select(selectAnswers));
    this.createForm()
  }

  ngOnInit(): void {
    this.store.dispatch(AnswerActions.loadAnswers());
    this.answers$.subscribe(answers => {
      this.currentAnswers = answers;
      this.answers = answers;
      console.log('Questions:', this.currentAnswers)
    })
  }

  createForm() {
    this.aswerForm = this.fb.group({
      answerText: ['', Validators.required]
    });
  }

  formFields = this.formConfig.getAnswerFormConfig()

  editAnswer(answer: Answer) {
    this.operation = 'update';
    this.selectedAnswer = answer;
    this.aswerForm.setValue({
      answerText: answer.answerText
    });
    this.showAddForm = true;
  }

  deleteAnswer(id: number) {
    this.store.dispatch(AnswerActions.deleteAnswer({ answerId: id }));
  }

  addAnswer() {
    const newAnswer = this.aswerForm.value as Answer;
    this.store.dispatch(AnswerActions.addAnswer({ answer: newAnswer }));
    this.resetForm();
  }

  updateAnswer() {

  }

  cancelForm() {
    this.operation = 'add';
    this.resetForm();
  }

  resetForm() {
    this.showAddForm = false;
    this.aswerForm.reset();
  }


}


