import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Answer } from '../models/Answer';
import { API_URLS } from '../shared/config/API';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(API_URLS.Answers_URL)
    .pipe(
      tap(answers => console.log('Received answers from service:', answers))
    );
  }

  addAnswer(answer: Answer): Observable<Answer[]> {
    return this.http.post<Answer[]>(API_URLS.Answers_URL, answer);
  }

  updateAnswer(answer: Answer): Observable<Answer[]> {
    return this.http.put<Answer[]>(API_URLS.Answers_URL + `/${answer.id}`, answer);
  }

  deleteAnswer(id: number): Observable<Answer[]> {
    return this.http.delete<Answer[]>(API_URLS.Answers_URL + `/${id}`);
  }


}
