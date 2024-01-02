import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Teacher } from 'src/app/models/Teacher';
import { API_URLS } from 'src/app/shared/config/API';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(API_URLS.Teachers_URL);
  }

  addTeacher(teacher: Teacher): Observable<Teacher[]>  {
    return this.http.post<Teacher[]> (API_URLS.Teachers_URL, teacher);
  }

  updateTeacher(teacher: Teacher): Observable<Teacher[]>  {
    return this.http.put<Teacher[]> (API_URLS.Teachers_URL + `/${teacher.id}`, teacher);
  }

  deleteTeacher(id: number): Observable<void> {
    return this.http.delete<void>(API_URLS.Teachers_URL + `/${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error deleting teacher:', error);
          return throwError(error);
        })
      );
  }
  
}
