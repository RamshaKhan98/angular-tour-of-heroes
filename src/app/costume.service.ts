import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Costume } from './costume';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class CostumeService {

  private costumesUrl = 'http://localhost:5000/api/costumes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET heroes from the server */
  getCostumes (): Observable<Costume[]> {
    return this.http.get<Costume[]>(this.costumesUrl)
      .pipe(
        tap(_ => this.log('fetched costumes')),
        catchError(this.handleError<Costume[]>('getCostumes', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getCostumeNo404<Data>(cid: number): Observable<Costume> {
    const url = `${this.costumesUrl}/?cid=${cid}`;
    return this.http.get<Costume[]>(url)
      .pipe(
        map(costumes => costumes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} costume cid=${cid}`);
        }),
        catchError(this.handleError<Costume>(`getCostume cid=${cid}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getCostume(cid: number): Observable<Costume> {
    const url = `${this.costumesUrl}/${cid}`;
    return this.http.get<Costume>(url).pipe(
      tap(_ => this.log(`fetched costume cid=${cid}`)),
      catchError(this.handleError<Costume>(`getCostume cid=${cid}`))
    );
  }


  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addCostume (costume: Costume): Observable<Costume> {
    return this.http.post<Costume>(this.costumesUrl, costume, this.httpOptions).pipe(
      tap((newCostume: Costume) => this.log(`added costume w/ cid=${newCostume.cid}`)),
      catchError(this.handleError<Costume>('addCostume'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteCostume (costume: Costume | number): Observable<Costume> {
    const cid = typeof costume === 'number' ? costume : costume.cid;
    const url = `${this.costumesUrl}/${cid}`;

    return this.http.delete<Costume>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted costume cid=${cid}`)),
      catchError(this.handleError<Costume>('deleteCostume'))
    );
  }

  /** PUT: update the hero on the server */
  updateCostume(costume: Costume): Observable<any> {
    const cid = typeof costume === 'number' ? costume : costume.cid;
    return this.http.put( `http://localhost:5000/api/costumes/${cid}` ,costume, this.httpOptions).pipe(
      tap(_ => this.log(`updated costume cid=${costume.cid}`)),
      catchError(this.handleError<any>('updateCostume'))
    );
  }
  // For HeroCostume Route
  getHeroCostume(id: number): Observable<Costume[]> {
    const url = `http://localhost:5000/api/herocostumes/${id}`;
    return this.http.get<Costume[]>(url);
  }
  // delete a herocostume
  delHeroCostume( id:number): Observable<Costume> {
   return this.http.put<Costume>(`http://localhost:5000/api/herocostumes/${id}`, this.httpOptions);

}

//add costume to particular hero
addCostumeToHero(data){
  let hid = data.heroId;
  let cid = data.cId;
  return this.http.put<any>(`http://localhost:5000/api/herocostumes/${hid}/${cid}`, this.httpOptions)
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
    this.messageService.add(`CostumeService: ${message}`);
  }
}