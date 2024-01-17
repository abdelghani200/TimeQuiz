import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  showAlert(title: string, message: string, icon: SweetAlertIcon = 'success') {
    return Swal.fire(title, message, icon);
  }

  showSuccess(title: string, message: string) {
    return this.showAlert(title, message, 'success');
  }

  showError(title: string, message: string) {
    return this.showAlert(title, message, 'error');
  }

  showUpdateSuccess() {
    return this.showSuccess('Update Successful', 'The item has been updated successfully.');
  }

  showDeleteSuccess() {
    return this.showSuccess('Delete Successful', 'The item has been deleted successfully.');
  }

  showDeleteConfirmation() {
    return Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });
  }
}
