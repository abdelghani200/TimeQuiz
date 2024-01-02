import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Media } from 'src/app/models/Media';
import { API_URLS } from 'src/app/shared/config/API';

@Injectable({
  providedIn: 'root'
})
export class MediasService {

  constructor(private http: HttpClient)
    {

    }

    getMedias(): Observable<Media[]> {
        return this.http.get<Media[]>(API_URLS.Media_URL);
    }

    deleteMedias(id: number): Observable<Media[]> {
        return this.http.delete<Media[]>(API_URLS.Media_URL + `/${id}`)
    }

    addMedias(media: Media): Observable<Media[]> {
        return this.http.post<Media[]>(API_URLS.Media_URL, media)
    }

}
