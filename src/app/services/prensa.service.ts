import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { Prensa } from '../models/prensa';


@Injectable({
  providedIn: 'root'
})
export class PrensaService {

  public prensa: Prensa;

  serverUrl = environment.url_servicios;

  constructor(private http: HttpClient) { }



  getPrensas() {
    return this.http.get<Prensa>(this.serverUrl + 'api_articulo/adminArticulos/').pipe(
      catchError(this.handleError)
    );
  }




  getPrensa(id:number): Observable<Prensa> {

    return this.http.get<Prensa>(this.serverUrl + 'api_articulo/adminArticulo/' + id).pipe(
      catchError(this.handleError)
    );
  }


  creatPrensa(prensa) {
    return this.http.post<any>(this.serverUrl + 'api_articulo/createArticulo/', prensa)
    .pipe(
      catchError(this.handleError)
    );
  }

  updatPrensa(prensa, id: number) {
    return this.http.post<any>(this.serverUrl + 'api_articulo/updateArticulo/' + id, prensa)
    .pipe(
      catchError(this.handleError)
    );
  }

  deletePrensa(id: number) {
    return this.http.delete(this.serverUrl + 'api_articulo/deleteArticulo/' + id).pipe(
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
