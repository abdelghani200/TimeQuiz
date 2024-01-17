import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormconfigService {

  constructor() { }

  getLevelFormConfig() {
    return [
      { label: 'Description', inputType: 'text', inputName: 'description', inputId: 'description', formControlName: 'description', placeholder: 'Description level', isRequired: true },
      { label: 'minPoints', inputType: 'number', inputName: 'minPoints', inputId: 'minPoints', formControlName: 'minPoints', placeholder: 'minPoints', isRequired: true },
      { label: 'maxPoints', inputType: 'number', inputName: 'maxPoints', inputId: 'maxPoints', formControlName: 'maxPoints', placeholder: 'maxPoints', isRequired: true },
    ];
  }

  getSubjectFormConfig() {
    return [
      { label: 'Name', inputType: 'text', inputName: 'name', inputId: 'name', formControlName: 'name', placeholder: 'Enter name', isRequired: true },
      { label: 'Title', inputType: 'text', inputName: 'Title', inputId: 'Title', formControlName: 'title', placeholder: 'Enter title', isRequired: true },
      { label: 'Parent ID', inputType: 'text', inputName: 'parent_id', inputId: 'parent_id', formControlName: 'parent_id', placeholder: 'Enter parent ID', isRequired: true },

    ];
  }

  getTeacherFormConfig() {
    return [
      { label: 'Prénom', inputType: 'text', inputName: 'firstName', inputId: 'firstName', formControlName: 'firstName', placeholder: 'Entrez le prénom', isRequired: true },
      { label: 'Nom', inputType: 'text', inputName: 'lastName', inputId: 'lastName', formControlName: 'lastName', placeholder: 'Entrez le nom', isRequired: true },
      { label: 'Date de naissance', inputType: 'date', inputName: 'dateOfBirth', inputId: 'dateOfBirth', formControlName: 'dateOfBirth', placeholder: 'Sélectionnez la date de naissance', isRequired: true },
      { label: 'Adresse', inputType: 'text', inputName: 'address', inputId: 'address', formControlName: 'address', placeholder: 'Entrez l\'adresse', isRequired: true },
      { label: 'Spécialité', inputType: 'text', inputName: 'speciality', inputId: 'speciality', formControlName: 'speciality', placeholder: 'Entrez la spécialité', isRequired: true },
    ];
  }

  getAssignmentFormConfig() {
    return [
      { label: 'Date de début', inputType: 'date', inputName: 'date_debut', inputId: 'date_debut', formControlName: 'date_debut', placeholder: 'Sélectionnez la date de début', isRequired: true },
      { label: 'Date de fin', inputType: 'date', inputName: 'date_fin', inputId: 'date_fin', formControlName: 'date_fin', placeholder: 'Sélectionnez la date de fin', isRequired: true },
      { label: 'Raison', inputType: 'text', inputName: 'raison', inputId: 'raison', formControlName: 'raison', placeholder: 'Entrez la raison', isRequired: false },
      { label: 'Score', inputType: 'number', inputName: 'score', inputId: 'score', formControlName: 'score', placeholder: 'Entrez le score', isRequired: false },
      { label: 'Nombre de tentatives', inputType: 'number', inputName: 'attempt_number', inputId: 'attempt_number', formControlName: 'attempt_number', placeholder: 'Entrez le nombre de tentatives', isRequired: false },
      { label: 'Score final', inputType: 'number', inputName: 'score_final', inputId: 'score_final', formControlName: 'score_final', placeholder: 'Entrez le score final', isRequired: false },
      { label: 'Quiz', inputType: 'text', inputName: 'quiz', inputId: 'quiz', formControlName: 'quiz', placeholder: 'Entrez l\'ID du quiz', isRequired: false },
      { label: 'Étudiant', inputType: 'text', inputName: 'student', inputId: 'student', formControlName: 'student', placeholder: 'Entrez l\'ID de l\'étudiant', isRequired: false },
    ];
  }

  getMessageFormConfig() {
    return [
      { label: 'Content', inputType: 'text', inputName: 'content', inputId: 'content', formControlName: 'content', placeholder: 'Enter message content', isRequired: true },
      { label: 'Sender', inputType: 'text', inputName: 'sender', inputId: 'sender', formControlName: 'sender', placeholder: 'Enter sender name', isRequired: true },
      { label: 'Type', inputType: 'text', inputName: 'sender', inputId: 'sender', formControlName: 'sender', placeholder: 'Enter sender name', isRequired: true },
      { label: 'Room', inputType: 'text', inputName: 'room_id', inputId: 'room_id', formControlName: 'room_id', placeholder: 'Enter sender name', isRequired: true },
      { label: 'Conversation', inputType: 'text', inputName: 'conversation_id', inputId: 'conversation_id', formControlName: 'conversation_id', placeholder: 'Enter sender name', isRequired: true },
    ];
  }

  getAnswerFormConfig() {
    return [
      { label: 'Text answer', inputType: 'text', inputName: 'answerText', inputId: 'answerText', formControlName: 'answerText', placeholder: 'Enter answer Text', isRequired: true },
      
    ];
  }


}
