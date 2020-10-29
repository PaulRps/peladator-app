import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Player } from '../../shared/models/player.model';
import { environment } from '../../../environments/environment';
import { LoggerService } from '../../core/services/logger.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const PLAYER_URL = `${environment.apiUrl}/player`;

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  public playersEvent = new EventEmitter<Player[]>();

  constructor(private http: HttpClient, private dialogService: DialogService) {}

  getAll(): Observable<Player[]> {
    return this.http.get<Player[]>(PLAYER_URL).pipe(
      tap(_ => LoggerService.debug('fetched players', _)),
      catchError(LoggerService.handleError('getPlayers', []))
    );
  }

  getFormData(): Observable<any> {
    return this.http.get<any>(`${PLAYER_URL}/form-data`).pipe(
      tap(_ => LoggerService.debug('fetched form-data', _)),
      catchError(LoggerService.handleError('getFormData', []))
    );
  }

  save(player: Player): Observable<Player[]> {
    return this.doRequestAndReturnAll(() => {
      return this.http.post<Player>(PLAYER_URL, player, httpOptions).pipe(
        tap((player: Player) => {
          LoggerService.debug(`added player w/ id=${player.toString()}`);
          this.dialogService.successMessage('Jogador Adicionado!');
        }),
        catchError(LoggerService.handleError<any>('addPlayer'))
      );
    });
  }

  update(player: Player): Observable<Player[]> {
    return this.doRequestAndReturnAll(() => {
      return this.http.put(PLAYER_URL, player, httpOptions).pipe(
        tap(() => {
          LoggerService.debug(`update player w/ id=${player.toString()}`);
          this.dialogService.successMessage('Jogador Atualizado!');
        }),
        catchError(LoggerService.handleError<any>('updatePlayer'))
      );
    });
  }

  delete(id: number): Observable<Player[]> {
    return this.doRequestAndReturnAll(() => {
      return this.http.delete(`${PLAYER_URL}/${id}`, httpOptions).pipe(
        tap(() => {
          LoggerService.debug(`deleted player w/ id=${id}`);
          this.dialogService.successMessage('Jogador deletado!');
        }),
        catchError(LoggerService.handleError<any>('deletePlayer'))
      );
    });
  }

  groupByPosition(): Observable<any> {
    return this.http.get(`${PLAYER_URL}/groupby-position`).pipe(
      tap(_ => LoggerService.debug('group by position players', _)),
      catchError(LoggerService.handleError('groupByPosition', []))
    );
  }

  sortTeams(selectedPlayers: Player[]): Observable<any> {
    return this.http.post(`${PLAYER_URL}/sort-teams`, selectedPlayers, httpOptions).pipe(
      tap((players: Player[]) => LoggerService.debug(`sort teams w/ id=${players ? players.toString() : ''}`, players)),
      catchError(LoggerService.handleError<Player[]>('sortTeams'))
    );
  }

  private doRequestAndReturnAll(callback: () => Observable<any>): Observable<Player[]> {
    return new Observable(observer => {
      callback().subscribe(any =>
        this.getAll().subscribe(players => {
          this.playersEvent.emit(players);
          observer.next(players);
        })
      );
    });
  }
}
