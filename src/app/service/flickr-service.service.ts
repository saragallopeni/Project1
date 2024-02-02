import { HttpClient, HttpClientJsonpModule, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlickrServiceService {


  private apiKey = 'dd6df9c0a2c31cd8ecd88834d4846b9b';
  private apiUrl = 'https://cors-anywhere.herokuapp.com/https://www.flickr.com/services/feeds/photos_public.gne';

  constructor(private http: HttpClient) { }

  searchPhotos(tags: string, page: number): Observable<any> {
    const url = `${this.apiUrl}?tags=${tags}&format=json&nojsoncallback=JSONP_CALLBACK&api_key=${this.apiKey}`;
    return this.http.get(url);
  }

  
  
}