import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from '../shared/config/API';
import { Subject } from '../models/Subject';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(API_URLS.Subjects_URL)
    .pipe(
      tap(subjects => console.log('Received levels from service:', subjects))
    );;
  }

  addSubject(subject: Subject): Observable<Subject[]> {
    return this.http.post<Subject[]>(API_URLS.Subjects_URL, subject);
  }

  updateSubject(subject: Subject): Observable<Subject[]> {
    return this.http.put<Subject[]>(API_URLS.Subjects_URL + `${subject.id}`, subject);
  }

}
