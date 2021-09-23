import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList = (
    ordering: string,
    page: number,
    search?: string
  ): Observable<APIResponse<Game>> => {

    let params = new HttpParams().set('ordering', ordering).set('page', page);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search).set('page', page);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games?key=${env.KEY}`, {
      params
    })
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}?key=${env.KEY}`);
    const gameTrailersRequest = this.http.get(`${env.BASE_URL}/games/${id}/movies?key=${env.KEY}`);
    const gameScreenshotsRequest = this.http.get(`${env.BASE_URL}/games/${id}/screenshots?key=${env.KEY}`);

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
}
