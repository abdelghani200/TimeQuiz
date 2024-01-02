import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Level } from 'src/app/models/Level';

import { Store, select } from '@ngrx/store';
import * as LevelActions from '../../../store/actions/level.actions';
import { AppState } from 'src/app/store/reducers';
import { selectLevels } from 'src/app/store/selectors/level.selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormconfigService } from 'src/app/services/formconfig.service';

@Component({
  selector: 'app-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements OnInit {
  levels$: Observable<Level[]>;
  currentLevels: Level[] = []

  operation: string = 'add'

  levelForm!: FormGroup
  selectedLevel: Level | null = null;

  showAddForm = false

  currentPage = 1;
  itemsPerPage = 5;

  constructor(private store: Store<AppState>, private fb: FormBuilder, private formConfig: FormconfigService) {
    this.levels$ = this.store.pipe(select(selectLevels));
    this.createForm()
  }

  ngOnInit(): void {
    this.store.dispatch(LevelActions.loadLevels());
    this.levels$.subscribe(levels => {
      this.currentLevels = levels;
      console.log('Current Levels:', this.currentLevels);
    });
  }

  createForm() {
    this.levelForm = this.fb.group({
      description: ['', Validators.required],
      minPoints: ['', Validators.required],
      maxPoints: ['', Validators.required]
    });
  }

  formFields = this.formConfig.getLevelFormConfig()


  deleteLevel(id: number) {
    this.store.dispatch(LevelActions.deleteLevel({ levelId: id }));
  }

  updateLevel() {
    const updatedLevel = this.levelForm.value;
    this.store.dispatch(LevelActions.updateLevel({ level: updatedLevel }));
    this.resetForm();
  }

  addLevel() {
    const newLevel = this.levelForm.value as Level;
    this.store.dispatch(LevelActions.addLevel({ level: newLevel }));
    this.resetForm()
  }

  cancelAddOrEdit() {
    this.operation = 'add';
    this.resetForm();
  }

  resetForm() {
    this.showAddForm = false;
    this.levelForm.reset();
  }

  editLevel(level: Level) {
    this.operation = 'update';
    this.selectedLevel = level;
    this.levelForm.setValue({
      description: level.description,
      minPoints: level.minPoints,
      maxPoints: level.maxPoints,
    });
    this.showAddForm = true;
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

}

