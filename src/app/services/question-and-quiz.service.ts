import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionToQuiz } from '../models/QuestionToQuiz';
import { API_URLS } from '../shared/config/API';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class QuestionAndQuizService {


  constructor(private http: HttpClient) { }

  getQuestionToQuiz(id: number): Observable<QuestionToQuiz[]>{
    return this.http.get<QuestionToQuiz[]>(API_URLS.QuizToQuestion_URL + `/${id}`);
  }

  QuestionToQuiz(questionToquiz: QuestionToQuiz): Observable<QuestionToQuiz[]>{
    return  this.http.post<QuestionToQuiz[]>(API_URLS.QuizToQuestion_URL, questionToquiz);
  }

}
