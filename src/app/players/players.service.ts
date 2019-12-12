import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from './player';
import { Observable, of  } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private playerUrl = environment.apiUrl + '/player';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playerUrl)
    .pipe(
      tap(_ => this.log('fetched players',_)),
      catchError(this.handleError('getPlayers', []))
    );
  }

  getFormData(): Observable<any> {
    return this.http.get<any>(this.playerUrl + '/form-data')
    .pipe(
      tap(_ => this.log('fetched form-data', _)),
      catchError(this.handleError('getFormData', []))
    );
  }

  save (player: Player): Observable<Player[]> {
    return this.http.post<Player[]>(this.playerUrl, player, httpOptions).pipe(
      tap((players: Player[]) => this.log(`added player w/ id=${players.toString()}`,players)),
      catchError(this.handleError<Player[]>('addPlayer'))
    );
  }

  delete (id: number): Observable<Player[]> {
    const url = `${this.playerUrl}/${id}`;
    return this.http.delete<Player[]>(url, httpOptions).pipe(
      tap((players: Player[]) => this.log(`deleted player w/ id=${players.toString()}`,players)),
      catchError(this.handleError<Player[]>('deletePlayer'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`,error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string, object:any) {
    console.log(message, object);
  }
}
