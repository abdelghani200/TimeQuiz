import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Level } from '../models/Level';
import { API_URLS } from '../shared/config/API';
import { tap } from 'rxjs/operators';
import { Page } from '../models/Page';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private http: HttpClient) { }

  getLevels(): Observable<Level[]> {
    return this.http.get<Level[]>(API_URLS.Levels_URL)
      .pipe(
        tap(levels => console.log('Received levels from service:', levels))
      );
  }
  

  addLevel(level: Level): Observable<any> {
    return this.http.post(API_URLS.Levels_URL, level);
  }

  deleteLevel(id: number): Observable<any> {
    return this.http.delete(API_URLS.Levels_URL + `/${id}`);
  }

  updateLevel(level: Level): Observable<any> {
    return this.http.put(API_URLS.Levels_URL + `/${level.id}`, level);
  }

  getLevelsPaginations(page: number, size: number): Observable<Page<Level>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<Page<Level>>(API_URLS.Levels_URL, { params });
  }

}
