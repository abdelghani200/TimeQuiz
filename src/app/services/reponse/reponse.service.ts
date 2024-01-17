import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URLS } from 'src/app/shared/config/API';
import { Response } from '../../models/Response';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {

  constructor(private http: HttpClient) { }

  addResponse(response: Response): Observable<Response[]> {
    return this.http.post<Response[]>(API_URLS.Response_URL, response);
  }

}
