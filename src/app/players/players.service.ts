import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from './player';
import { Observable, of  } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PlayerPosition } from './player.position';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private playerUrl = 'api/player/';
  
  onPlayerAdded = new EventEmitter<Player[]>();

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playerUrl)
      .pipe(
        tap(_ => this.log('fetched players')),
        catchError(this.handleError('getPlayers', []))
      );
  }

  getPlayerAddData(): Observable<any> {
    return this.http.get<any>(this.playerUrl+"/view-add-data")
      .pipe(
        tap(_ => this.log('fetched view-add-data')),
        catchError(this.handleError('getPlayerAddData', []))
      );
  }

  addPlayer (player: Player): Observable<Player[]> {
    return this.http.post<Player[]>(this.playerUrl, player, httpOptions).pipe(
      tap((newPlayer: Player[]) => this.log(`added player w/ id=${newPlayer.toString()}`)),
      catchError(this.handleError<Player[]>('addPlayer'))
    );
  }

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

  private log(message: string) {
    console.log(message);
  }
}
