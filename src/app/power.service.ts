import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Power } from './power';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class PowerService {

  private powersUrl = 'http://localhost:5000/api/powers';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getPowers (): Observable<Power[]> {
    return this.http.get<Power[]>(this.powersUrl)
      .pipe(
        tap(_ => this.log('fetched powers')),
        catchError(this.handleError<Power[]>('getPowers', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getPowerNo404<Data>(pid: number): Observable<Power> {
    const url = `${this.powersUrl}/?pid=${pid}`;
    return this.http.get<Power[]>(url)
      .pipe(
        map(powers => powers[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} power pid=${pid}`);
        }),
        catchError(this.handleError<Power>(`getPower pid=${pid}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getPower(pid: number): Observable<Power> {
    const url = `${this.powersUrl}/${pid}`;
    return this.http.get<Power>(url).pipe(
      tap(_ => this.log(`fetched power pid=${pid}`)),
      catchError(this.handleError<Power>(`getPower pid=${pid}`))
    );
  }

  /* GET heroes whose name contains search term */
  searchPowers(term: string): Observable<Power[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Power[]>(`${this.powersUrl}/?pname=${term}`).pipe(
      tap(_ => this.log(`found powers matching "${term}"`)),
      catchError(this.handleError<Power[]>('searchPowers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addPower (power: Power): Observable<Power> {
    return this.http.post<Power>(this.powersUrl, power, this.httpOptions).pipe(
      tap((newPower: Power) => this.log(`added power w/ pid=${newPower.pid}`)),
      catchError(this.handleError<Power>('addPower'))
    );
  } 
  /** POST: add a new powr to the hero at server */
  addPowerToHero(Array : any): Observable<any> {
    let id = Array.hero_id;
    let power_id = Array.power_id;
    console.log(Array)
    return this.http.post<any>(`http://localhost:5000/api/bridgeTable/${id}/${power_id}` , this.httpOptions)
  } 
   /** GET: get  powers of the hero at server */
   getHeroPowers(id: number): Observable<Power[]> {
    const url = `http://localhost:5000/api/bridgeTable/${id}`;
    return this.http.get<Power[]>(url).pipe(
      tap(_ => this.log(`fetched heroPowers  id=${id}`)),
      catchError(this.handleError<Power[]>(`getHeroPowers id=${id}`))
    );
  }
/** 
  getHeroPowers(id: number): Observable<Power[]> {
    const url = `http://localhost:5000/bridgeTable/${id}`;
    return this.http.get<Power[]>(url);
  }*/
  /** DELETE: delete the power of hero from the server */
  deletePowerFromHeroPower(id : number): Observable<any> {
    return this.http.delete<any>(`http://localhost:5000/api/bridgeTable/${id}`, this.httpOptions)
   
  } 

  /** DELETE: delete the hero from the server */
  deletePower (power: Power | number): Observable<Power> {
    const pid = typeof power === 'number' ? power : power.pid;
    const url = `${this.powersUrl}/${pid}`;

    return this.http.delete<Power>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted power pid=${pid}`)),
      catchError(this.handleError<Power>('deletePower'))
    );
  }

  /** PUT: update the hero on the server */
  updatePower(power: Power): Observable<any> {
    const pid = typeof power === 'number' ? power : power.pid;
    return this.http.put( `http://localhost:5000/api/powers/${pid}` , power, this.httpOptions).pipe(
      tap(_ => this.log(`updated power pid=${power.pid}`)),
      catchError(this.handleError<any>('updatePower'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PowerService: ${message}`);
  }
}