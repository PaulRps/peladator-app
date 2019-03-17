import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Player } from './player';
import { Observable, of  } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PlayerPosition } from './player.position';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PlayersService {
  
  private playerUrl = environment.apiUrl + '/player/';
  
  onPlayerAdded = new EventEmitter<Player[]>();
  
  constructor(private http: HttpClient) { }
  
  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.playerUrl)
    .pipe(
      tap(_ => this.log('fetched players',_)),
      catchError(this.handleError('getPlayers', []))
    );
  }
  
  getPlayerAddData(): Observable<any> {
    return this.http.get<any>(this.playerUrl+"view-add-data")
    .pipe(
      tap(_ => this.log('fetched view-add-data',_)),
      catchError(this.handleError('getPlayerAddData', []))
    );
  }
  
  addPlayer (player: Player): Observable<Player[]> {
    return this.http.post<Player[]>(this.playerUrl, player, httpOptions).pipe(
      tap((newPlayer: Player[]) => this.log(`added player w/ id=${newPlayer.toString()}`,newPlayer)),
      catchError(this.handleError<Player[]>('addPlayer'))
    );
  }
  
  deletePlayer (id: number): Observable<Player[]> {
    
    const url = `${this.playerUrl}${id}`;
    
    return this.http.delete<Player[]>(url, httpOptions).pipe(
      tap((newPlayer: Player[]) => this.log(`added player w/ id=${newPlayer.toString()}`,newPlayer)),
      catchError(this.handleError<Player[]>('addPlayer'))
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
