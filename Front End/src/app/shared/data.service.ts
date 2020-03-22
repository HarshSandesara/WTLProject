import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Event } from './Events'

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public URL = "http://localhost:8000/"

  constructor(public http: HttpClient) { }

  public fetchEvents() {
    return this.http.get(this.URL+'api/events');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  public addEvent(event:Event): Observable<Event> {
    return this.http.post<Event>(URL + '/api/events', event)
    .pipe(catchError(this.handleError));
  }
}
