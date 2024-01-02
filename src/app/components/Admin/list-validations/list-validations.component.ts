import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Validation } from 'src/app/models/Validation';
import { AppState } from 'src/app/store/reducers';
import { selectValidations } from 'src/app/store/selectors/validation.selectors';
import * as ValidationActions from '../../../store/actions/validation.actions'

@Component({
  selector: 'app-list-validations',
  templateUrl: './list-validations.component.html',
  styleUrls: ['./list-validations.component.css']
})
export class ListValidationsComponent implements OnInit {

  validations$: Observable<Validation[]>
  listValidationShow = false;

  constructor(private store: Store<AppState>, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
    this.validations$ = this.store.pipe(select(selectValidations))
  }

  ngOnInit(): void {
    this.store.dispatch(ValidationActions.getAllValidations());
    this.validations$.subscribe(validations => {
      console.log('validations:', validations);
    });
  }

  closeValidationPopup() {
    this.listValidationShow = false;
}

openValidations(){
  this.listValidationShow = true
}




}
