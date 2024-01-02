import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { selectQuestions } from 'src/app/store/selectors/question.selectors';
import * as QuestionActions from '../../../store/actions/question.actions'
import { selectAnswers } from 'src/app/store/selectors/answer.selectors';
import * as AnswerActions from '../../../store/actions/answer.actions';
import * as ValidationActions from '../../../store/actions/validation.actions'

@Component({
  selector: 'app-valid-question',
  templateUrl: './valid-question.component.html',
  styleUrls: ['./valid-question.component.css']
})
export class ValidQuestionComponent implements OnInit {

  @Input() selectedQuestion: any;

  validationForm!: FormGroup;

  operation: string = 'add'
  displayedQuestion: string = '';
  listValidationShow = true;

  questions$ = this.store.pipe(select(selectQuestions));
  answers$ = this.store.pipe(select(selectAnswers));

  showAddForm = false


  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.createFormValidation()
  }

  ngOnInit(): void {
    this.store.dispatch(QuestionActions.loadsQuestions());
    this.store.dispatch(AnswerActions.loadAnswers());

    this.initValidationForm();
  }

  createFormValidation() {
    this.validationForm = this.fb.group({
      question_id: ['', Validators.required],
      response_id: ['', Validators.required],
      points: ['', Validators.required]
    });
  }

  initValidationForm() {
    if (this.selectedQuestion) {
      this.displayedQuestion = this.selectedQuestion.text;
      console.log(this.displayedQuestion)
      this.validationForm.patchValue({
        question_id: this.selectedQuestion.id,
        response_id: '',
        points: ''
      });
    }
  }

  addValidation() {
    const newValidation = this.validationForm.value;
    this.store.dispatch(ValidationActions.validateQuestion({ validation: newValidation }));

    this.validationForm.reset();
  }

  cancelAddOrEdit() {
    this.operation = 'add';
    this.resetForm();
  }

  resetForm() {
    this.showAddForm = false ;
    this.validationForm.reset();
  }
  closeValidations(){
    this.listValidationShow = false
  }

}
