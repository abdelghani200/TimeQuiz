import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/Question';
import { AppState } from 'src/app/store/reducers';
import { selectQuestions } from 'src/app/store/selectors/question.selectors';
import * as QuestionActions from '../../../store/actions/question.actions';
import * as ToQuizActions from '../../../store/actions/questionQuiz.actions';


@Component({
  selector: 'app-question-to-quiz',
  templateUrl: './question-to-quiz.component.html',
  styleUrls: ['./question-to-quiz.component.css']
})
export class QuestionToQuizComponent implements OnInit {

  @Input() selectedQuiz!: any

  questions$: Observable<Question[]>;

  questionToquizForm!: FormGroup

  operation: String = 'add'
  currentQuestions!: Question[]
  displayedQuiz: string = '';

  questions: Question[] = [];

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.questions$ = this.store.pipe(select(selectQuestions));
    this.createQuestionToQuizForm()
  }


  ngOnInit(): void {

    this.store.dispatch(QuestionActions.loadsQuestions());
    this.questions$.subscribe(questions => {
      this.currentQuestions = questions;
      this.questions = questions;
      console.log('Questions:', this.currentQuestions)
    });

    this.initToQuizForm()

  }

  createQuestionToQuizForm() {
    this.questionToquizForm = this.fb.group({
      question_id: ['', Validators.required],
      quiz_id: ['', Validators.required],
      time: '',
    });
  }

  initToQuizForm() {
    if (this.selectedQuiz) {
      this.displayedQuiz = this.selectedQuiz.title;
      console.log(this.displayedQuiz)
      this.questionToquizForm.patchValue({
        question_id: ['', Validators.required],
        quiz_id: this.selectedQuiz.id,
        points: ''
      });
    }
  }


  QuestioToQuiz() {
    const newToQuiz = this.questionToquizForm.value;
console.log(newToQuiz)
    this.store.dispatch(ToQuizActions.ToQuiz({ questionsAndQuiz: newToQuiz }));

    this.questionToquizForm.reset();

  }




}
