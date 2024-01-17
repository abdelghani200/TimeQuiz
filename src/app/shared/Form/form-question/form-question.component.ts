import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Level } from 'src/app/models/Level';
import { Subject } from 'src/app/models/Subject';
import { AppState } from 'src/app/store/reducers';
import { selectLevels } from 'src/app/store/selectors/level.selectors';
import { selectSubjects } from 'src/app/store/selectors/subject.selectors';
import * as ActionsLevels from '../../../store/actions/level.actions'
import * as ActionsSubjects from '../../../store/actions/subject.actions'

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.css']
})
export class FormQuestionComponent {

  @Input() formGroup!: FormGroup;
  @Input() operation: 'add' | 'update' = 'add';
  @Output() submitForm = new EventEmitter<void>();
  @Output() cancelEdit = new EventEmitter<void>();

  levels$: Observable<Level[]>;
  subjects$: Observable<Subject[]>;
  currentLevels: Level[] = []
  currentSubjects: Subject[] = []

  constructor(private store: Store<AppState>) {
    this.levels$ = this.store.pipe(select(selectLevels))
    this.subjects$ = this.store.pipe(select(selectSubjects))
  }

  ngOnInit(): void {
    this.store.dispatch(ActionsLevels.loadLevels());
    this.store.dispatch(ActionsSubjects.loadSubjects());
    this.levels$.subscribe(levels => {
      this.currentLevels = levels;
      console.log('Levels:', this.currentLevels)
    })
    this.subjects$.subscribe(subjects => {
      this.currentSubjects = subjects;
      console.log('Subjects:', this.currentSubjects)
    })
  }

}
