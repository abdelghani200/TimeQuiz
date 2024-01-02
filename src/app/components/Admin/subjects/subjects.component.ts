import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/models/Subject';
import * as SubjectActions from '../../../store/actions/subject.actions'
import { AppState } from 'src/app/store/reducers';
import { selectSubjects } from 'src/app/store/selectors/subject.selectors';
import { FormconfigService } from 'src/app/services/formconfig.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  subjects$: Observable<Subject[]>;
  currentSubjects: Subject[] = []

  showAddForm = false
  operation: string = 'add'
  subjectForm!: FormGroup

  constructor(private store: Store<AppState>, private fb: FormBuilder, private formConfig: FormconfigService) {
    this.subjects$ = this.store.pipe(select(selectSubjects));
    this.createForm()
  }

  ngOnInit(): void {
    this.store.dispatch(SubjectActions.loadSubjects());
    this.subjects$.subscribe(subjects => {
      this.currentSubjects = subjects;
      console.log('data of subjects :', this.currentSubjects)
    })
  }

  cancelAddOrEdit() {
    this.operation = 'add';
    this.resetForm();
  }

  resetForm() {
    this.showAddForm = false;
    this.subjectForm.reset();
  }

  createForm() {
    this.subjectForm = this.fb.group({
      name: ['', Validators.required],
      title: ['', Validators.required],
      parent_id: ['', Validators.required]
    });
  }

  formFields = this.formConfig.getSubjectFormConfig()

  updateSubject() {

  }

  addSubject() {

  }

}
