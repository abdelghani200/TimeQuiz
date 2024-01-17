import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as QuestionActions from '../../../store/actions/question.actions';
import { Question } from 'src/app/models/Question';
import { FormconfigService } from 'src/app/services/formconfig.service';
import { AppState } from 'src/app/store/reducers';
import { selectQuestions } from 'src/app/store/selectors/question.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  @Output() validationModalOpen = new EventEmitter<any>();

  questions$: Observable<Question[]>;
  currentQuestions!: Question[]
  questions: Question[] = [];
  questionForm!: FormGroup;
  showAddForm = false

  currentPage = 1;
  itemsPerPage = 6;
  operation: String = 'add';
  selectedQuestion: any;
  isDropdownVisible: boolean = false;
  isValidationModalOpen = false;
  listValidationShow = false;

  constructor(private store: Store<AppState>, private fb: FormBuilder, private formConfig: FormconfigService, private router: Router) {
    this.questions$ = this.store.pipe(select(selectQuestions))
    this.createQuestionForm()
  }

  ngOnInit(): void {
    this.store.dispatch(QuestionActions.loadsQuestions());
    this.questions$.subscribe(questions => {
      this.currentQuestions = questions;
      this.questions = questions;
      console.log('Questions:', this.currentQuestions)
    })
  }

  createQuestionForm() {
    this.questionForm = this.fb.group(
      {
        text: ['', Validators.required],
        answerNumber: ['', Validators.required],
        type: ['', Validators.required],
        level_id: ['', Validators.required],
        subject_id: ['', Validators.required],
        answerCorrectNumber: ['', Validators.required],
        scorePoints: ['', [Validators.required, Validators.min(0)]],

      }
    )
  }


  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }


  openValidationModal(question: any) {
    this.selectedQuestion = question;
    this.isValidationModalOpen = true;
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  addQuestion(){
    const newQuestion = this.questionForm.value as Question;
    this.store.dispatch(QuestionActions.addQuestion({ question: newQuestion }));
    this.resetForm();
  }

  cancelAddOrEdit(){

  }

  resetForm(){

  }

}
