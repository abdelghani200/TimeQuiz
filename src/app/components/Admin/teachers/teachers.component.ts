import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/models/Teacher';
import { AppState } from 'src/app/store/reducers';
import * as TeacherActions from '../../../store/actions/teacher.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormconfigService } from 'src/app/services/formconfig.service';
import { selectTeachers } from 'src/app/store/selectors/teacher.selectors';
import { SweetAlertService } from 'src/app/services/sweetAlert/sweet-alert.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {

  teachers$: Observable<Teacher[]>;
  currentTeachers: Teacher[] = []

  operation: string = 'add'

  teacherForm!: FormGroup
  selectedTeacher: Teacher | null = null;

  showAddForm = false

  constructor(private store: Store<AppState>, private fb: FormBuilder, private formConfig: FormconfigService, private sweetAlertService: SweetAlertService) {
    this.teachers$ = this.store.pipe(select(selectTeachers));
    this.createForm()
  }

  ngOnInit(): void {
    this.store.dispatch(TeacherActions.loadTeachers());
    this.teachers$.subscribe(teachers => {
      this.currentTeachers = teachers;
      console.log('Current teachers:', this.currentTeachers);
    });
  }

  createForm() {
    this.teacherForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required],
      speciality: ['', Validators.required],
    });
  }

  formFields = this.formConfig.getTeacherFormConfig()

  deleteTeacher(id: number) {
    this.sweetAlertService.showAlert('Confirmation', 'Êtes-vous sûr de vouloir supprimer?', 'warning')
      .then((result) => {
        if (result.isConfirmed) {
          this.store.dispatch(TeacherActions.deleteTeacher({ teacherId: id }));
          this.sweetAlertService.showAlert('Supprimé!', 'Votre élément a été supprimé.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.sweetAlertService.showAlert('Annulé', 'Votre élément est en sécurité :)', 'error');
        }
      })
      .catch((error) => {
        console.error('Error deleting teacher:', error);
        // Handle error as needed
        this.sweetAlertService.showAlert('Erreur', 'Une erreur s\'est produite lors de la suppression.', 'error');
      });
  }
  


  updateTeacher() {
    const updatedTeacher = this.teacherForm.value;
    this.store.dispatch(TeacherActions.updateTeacher({ teacher: updatedTeacher }));
    this.resetForm();
    this.sweetAlertService.showAlert('Mise a jour reussie!', 'Les donnees ont ete mises a jour avec succes.', 'success');
  }

  addTeacher() {
    const newTeacher = this.teacherForm.value as Teacher;
    this.store.dispatch(TeacherActions.addTeacher({ teacher: newTeacher }));
    this.resetForm();
    this.sweetAlertService.showAlert('Ajout reussi!', 'Les donnees ont ete ajoutees avec succes.', 'success');
  }

  cancelAddOrEdit() {
    this.operation = 'add';
    this.resetForm();
  }

  resetForm() {
    this.showAddForm = false;
    this.teacherForm.reset();
  }

  editTeacher(teacher: Teacher) {
    this.operation = 'update';
    this.selectedTeacher = teacher;
    this.teacherForm.setValue({
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      dateOfBirth: teacher.dateOfBirth,
      address: teacher.address,
      speciality: teacher.speciality,
    });
    this.showAddForm = true;
  }

}
