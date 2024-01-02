import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from 'src/app/models/Assignment';
import { API_URLS } from 'src/app/shared/config/API';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private http: HttpClient) { }

  getAllAssignments(): Observable<Assignment[]>{
    return this.http.get<Assignment[]>(API_URLS.Assignment_URL)
  }

  addAssignment(assegnmentquiz: Assignment): Observable<Assignment>{
    return this.http.post<Assignment>(API_URLS.Assignment_URL, assegnmentquiz);
  }

  updateAssignment(assegnmentquiz: Assignment): Observable<Assignment>{
    return this.http.put<Assignment>(API_URLS.Assignment_URL + `/${assegnmentquiz.id}`, assegnmentquiz);
  }

  deleteAssignment(id: number): Observable<Assignment[]>{
    return this.http.delete<Assignment[]>(API_URLS.Assignment_URL + `/${id}`)
  }

}
