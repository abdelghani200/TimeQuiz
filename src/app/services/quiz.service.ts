import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Quiz } from '../models/Quiz';
import { Observable } from 'rxjs';
import { API_URLS } from '../shared/config/API';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  getQuiz(): Observable<Quiz[]>{
    return this.http.get<Quiz[]>(API_URLS.Quiz_URL);
  }

  addQuiz(quiz: Quiz): Observable<Quiz[]>{
    return this.http.post<Quiz[]>(API_URLS.Quiz_URL, quiz)
  }

  updateQuiz(quiz: Quiz): Observable<Quiz[]>{
    return this.http.put<Quiz[]>(API_URLS.Quiz_URL + `/${quiz.id}`, quiz)
  }

  deleteQuiz(id: number): Observable<Quiz[]>{
    return this.http.delete<Quiz[]>(API_URLS.Quiz_URL + `/${id}`)
  }


}
