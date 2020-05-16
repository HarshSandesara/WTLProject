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
    return this.http.get(this.URL + 'api/events');
  }

  public fetchFollowingEvents(id: number) {
    return this.http.get(this.URL + 'api/following/' + id);
  }

  public fetchCommittees() {
    return this.http.get(this.URL + 'api/committeesData');
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

  public editEvent(data: any): Observable<void>{
    return this.http.put<void>(this.URL + "api/events/" + data.id, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError))
  }

  public followCommittee(user_id: number, committee_id: number) {
    return this.http.get(this.URL + 'api/follow/' + user_id + '/' + committee_id);
  } 

  public registerEvent(user_id: number, event_id: number) {
    return this.http.get(this.URL + 'api/register/' + user_id + '/' + event_id);
  } 

  public countResponses(event_id: number) {
    return this.http.get(this.URL + 'api/responses/' + event_id);
  }

  public editName(data: any): Observable<void>{
    return this.http.put<void>(this.URL + "api/events/", data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(catchError(this.handleError))
  }
  // public logoutUser() {
  //   return this.http.post(this.URL + "logoutMiddle", null, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': 'http://localhost:8000/logoutMiddle'
  //     })
  //   }).pipe(catchError(this.handleError));
  // }
}
