import { Injectable } from '@angular/core';
import { Violacionesddhh } from '../models/violaciones';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViolacionesddhhService {

  serverUrl = environment.url_servicios;

  constructor(private http: HttpClient) { }

  getViolacionesddhhs() {
    return this.http.get<Violacionesddhh>(this.serverUrl + 'api_violacionesddhh/adminViolacionesddhhs/').pipe(
      catchError(this.handleError)
    );
  }

  getViolacionesddhh(id: number) {
    return this.http.get<Violacionesddhh>(this.serverUrl + 'api_violacionesddhh/adminViolacionesddhh/' + id).pipe(
      catchError(this.handleError)
    );
  }


  createViolacionesddhh(violacionesddhh) {
    return this.http.post<any>(this.serverUrl + 'api_violacionesddhh/createViolacionesddhh/', violacionesddhh)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateViolacionesddhh(violacionesddhh, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_violacionesddhh/updateViolacionesddhh/' + id, violacionesddhh)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteViolacionesddhh(id: number) {
    return this.http.delete(this.serverUrl + 'api_violacionesddhh/deleteViolacionesddhh/' + id).pipe(
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
