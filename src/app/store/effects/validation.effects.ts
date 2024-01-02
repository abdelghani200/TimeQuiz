import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import * as ValidationActions from '../../store/actions/validation.actions';
import { ValidationService } from '../../services/validation.service';

@Injectable()
export class ValidationEffects {

    validateQuestion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ValidationActions.validateQuestion),
            mergeMap(action =>
                this.validationService.validateQuestion(action.validation).pipe(
                    map(validations => ValidationActions.validateQuestionSuccess({ validations }))
                )
            )
        )
    );

    getAllValidations$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ValidationActions.getAllValidations),
            mergeMap(() =>
                this.validationService.getAllValidations().pipe(
                    map(validations => ValidationActions.getAllValidationsSuccess({ validations }))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private validationService: ValidationService
    ) { }
}
