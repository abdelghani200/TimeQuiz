import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as AssignmentActions from '../actions/assignment.actions';
import { AssignmentService } from 'src/app/services/Assignment/assignment.service';


@Injectable()
export class AssignmentEffects {

    constructor(
        private actions$: Actions,
        private assignmentService: AssignmentService
    ) { }

    loadAssignments$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AssignmentActions.loadAssignments),
            exhaustMap(() => {
                return this.assignmentService.getAllAssignments().pipe(
                    tap(assignments => console.log('Received assignments in effect:', assignments)),
                    map((assignments) => AssignmentActions.loadAssignmentsSuccess({ assignments })),
                    catchError((error) => {
                        console.error('Error fetching teachers:', error);
                        return of(AssignmentActions.loadAssignmentsFailure({ error }));
                    })
                );
            })
        );
    });


    deleteAssignment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AssignmentActions.deleteAssignment),
            exhaustMap((action) => {
                return this.assignmentService.deleteAssignment(action.assignmentId).pipe(
                    tap(() => console.log('Assignment deleted successfully')),
                    map(() => AssignmentActions.deleteAssignment({ assignmentId: action.assignmentId })),
                    catchError((error) => {
                        console.error('Error deleting assignment:', error);
                        return of(AssignmentActions.deleteAssignmentsFailure({ error }));
                    })
                );
            })
        );
    });


    updateAssignment$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AssignmentActions.updateAssignment),
            exhaustMap((action) => {
                return this.assignmentService.updateAssignment(action.assignment).pipe(
                    tap(() => console.log('Assignment updated successfully')),
                    map(() => AssignmentActions.updateAssignment({ assignment: action.assignment })),
                    catchError((error) => {
                        console.error('Error updating assignment:', error);
                        return of(AssignmentActions.updateAssignmentFailure({ error }));
                    })
                );
            })
        );
    });


}
