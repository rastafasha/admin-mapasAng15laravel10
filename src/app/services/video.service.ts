import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Video } from '../models/video';


@Injectable({
  providedIn: 'root'
})
export class VideoService {

  public video: Video;

  serverUrl = environment.url_servicios;

  constructor(private http: HttpClient) { }



  getVideos() {
    return this.http.get<Video>(this.serverUrl + 'api_video/adminVideos/').pipe(
      catchError(this.handleError)
    );
  }




  getVideo(id:number): Observable<Video> {

    return this.http.get<Video>(this.serverUrl + 'api_video/adminVideo/' + id).pipe(
      catchError(this.handleError)
    );
  }


  creatVideo(video) {
    return this.http.post<any>(this.serverUrl + 'api_video/createVideo/', video)
    .pipe(
      catchError(this.handleError)
    );
  }

  updatVideo(video, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_video/updateVideo/' + id, video)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteVideo(id: number) {
    return this.http.delete(this.serverUrl + 'api_video/deleteVideo/' + id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }
}
