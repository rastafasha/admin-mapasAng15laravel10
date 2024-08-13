import { Injectable } from '@angular/core';
import { Datosvictima } from '../models/datos';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatosvictimaService {

  serverUrl = environment.url_servicios;

  constructor(
    private http: HttpClient,
    public authService: AuthService,
  ) { }

  getDatosvictimas() {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/eventos";
    return this.http.get(URL, {headers:headers}).pipe(
      catchError(this.handleError)
    );
  }

  getDatosvictima(id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/evento/show/"+id;
    return this.http.get(URL,{headers:headers});
  }
  getDatosvictimaPais(id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/evento/show/pais/"+id;
    return this.http.get(URL,{headers:headers});
  }
  getDatosvictimaPaisCode(code: string) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/evento/show/pais/code/"+code;
    return this.http.get(URL,{headers:headers});
  }


  createDatosvictima(data:any) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/evento/store";
    return this.http.post(URL,data, {headers:headers});
  }

  updateDatosvictima(data:any, id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/evento/update/"+id;
    return this.http.post(URL,data,{headers:headers});
  }

  deleteDatosvictima(id: number) {
    let headers = new HttpHeaders({'Authorization': 'Bearer'+this.authService.token});
    let URL = this.serverUrl+"/evento/destroy/"+id;
    return this.http.delete(URL, {headers:headers});
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
