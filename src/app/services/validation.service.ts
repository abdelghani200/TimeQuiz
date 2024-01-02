import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Validation } from '../models/Validation';
import { API_URLS } from '../shared/config/API';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private http: HttpClient) { }

  validateQuestion(validation: Validation): Observable<Validation[]> {
    return this.http.post<Validation[]>(API_URLS.Validation_URL, validation);
  }

  getAllValidations(): Observable<Validation[]>{
    return this.http.get<Validation[]>(API_URLS.Validation_URL)
  }


}
