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

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error: ', errorResponse.error.message);
    } else {
      console.error('Server Side Error: ', errorResponse);
    }

    return throwError('There is a problem with the service. We are notified and working on it.');
  };

  public addEvent(event:Event): Observable<Event> {
    return this.http.post<Event>(this.URL + 'api/events', event)
    .pipe(catchError(this.handleError));
  }

  public deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(this.URL + "api/events/" + id)
    .pipe(catchError(this.handleError));
  }

  public postEvent(data: any): Observable<Event>{
    return this.http.post<Event>(this.URL + "api/events", data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError))
  }
}
