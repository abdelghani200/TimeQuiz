import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/models/Assignment';
import { AppState } from 'src/app/store/reducers';
import { selectAssignments } from 'src/app/store/selectors/assignment.selectors';
import * as AssignmentActions from '../../../store/actions/assignment.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormconfigService } from 'src/app/services/formconfig.service';
import { SweetAlertService } from 'src/app/services/sweetAlert/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent {


  assignments$: Observable<Assignment[]>;
  currentAssignments: Assignment[] = []

  operation: string = 'add'

  assignmentForm!: FormGroup
  selectedAssignment: Assignment | null = null;

  showAddForm = false

  constructor(private store: Store<AppState>, private fb: FormBuilder, private formConfig: FormconfigService, private sweetAlertService: SweetAlertService) {
    this.assignments$ = this.store.pipe(select(selectAssignments));
    this.createForm()
  }

  ngOnInit(): void {
    this.store.dispatch(AssignmentActions.loadAssignments());
    this.assignments$.subscribe(assignments => {
      this.currentAssignments = assignments;
      console.log('Current Assignment:', this.currentAssignments);
    });
  }

  createForm() {
    this.assignmentForm = this.fb.group({
      date_debut: ['', Validators.required],
      date_fin: ['', Validators.required],
      raison: '',
      score: [0, Validators.min(0)],
      attempt_number: [0, Validators.min(0)],
      score_final: [0, Validators.min(0)],
      quiz: '',
      student: '',
      students: this.fb.array([]),
      
    });
  }

  formFields = this.formConfig.getAssignmentFormConfig()

  deleteAssignment(id: number) {
    this.sweetAlertService.showAlert('Confirmation', 'Êtes-vous sûr de vouloir supprimer?', 'warning')
      .then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(AssignmentActions.deleteAssignment({ assignmentId: id }));
          this.sweetAlertService.showAlert('Supprimé!', 'Votre élément a été supprimé.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.sweetAlertService.showAlert('Annulé', 'Votre élément est en sécurité :)', 'error');
        }
      })
      .catch((error) => {
        console.error('Error deleting teacher:', error);
        this.sweetAlertService.showAlert('Erreur', 'Une erreur s\'est produite lors de la suppression.', 'error');
      });
  }

  addAssignment() {
    const newAssignment = this.assignmentForm.value as Assignment;
    this.store.dispatch(AssignmentActions.addAssignment({ assignment: newAssignment }));
    this.resetForm();
    this.sweetAlertService.showAlert('Assignment reussi!', 'Les donnees ont ete ajoutees avec succes.', 'success');
  }

  cancelAddOrEdit() {
    this.operation = 'add';
    this.resetForm();
  }

  resetForm() {
    this.showAddForm = false;
    this.assignmentForm.reset();
  }



}
