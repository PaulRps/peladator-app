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

const PLAYER_URL = environment.apiUrl + '/player';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  public playersEvent = new EventEmitter<Player[]>();

  constructor(private http: HttpClient, private dialogService: DialogService) {}

  getAll() {
    return this.http.get<any[]>(PLAYER_URL).pipe(
      tap(_ => LoggerService.log('fetched players', _)),
      catchError(LoggerService.handleError('getPlayers', []))
    );
  }

  getFormData(): Observable<any> {
    return this.http.get<any>(PLAYER_URL + '/form-data').pipe(
      tap(_ => LoggerService.log('fetched form-data', _)),
      catchError(LoggerService.handleError('getFormData', []))
    );
  }

  save(player: Player): Observable<Player[]> {
    return this.http.post<Player[]>(PLAYER_URL, player, httpOptions).pipe(
      tap((players: Player[]) => {
        LoggerService.log(`added player w/ id=${players ? players.toString() : ''}`, players);
        this.dialogService.successMessage('Jogador Adicionado!');
        this.playersEvent.emit(players);
      }),
      catchError(LoggerService.handleError<Player[]>('addPlayer'))
    );
  }

  update(player: Player): Observable<Player[]> {
    return this.http.put<Player[]>(PLAYER_URL, player, httpOptions).pipe(
      tap((players: Player[]) => {
        LoggerService.log(`update player w/ id=${players ? players.toString() : ''}`, players);
        this.dialogService.successMessage('Jogador Atualizado!');
        this.playersEvent.emit(players);
      }),
      catchError(LoggerService.handleError<Player[]>('updatePlayer'))
    );
  }

  delete(id: number): Observable<Player[]> {
    return this.http.delete<Player[]>(`${PLAYER_URL}/${id}`, httpOptions).pipe(
      tap((players: Player[]) => {
        LoggerService.log(`deleted player w/ id=${players ? players.toString() : ''}`, players);
        this.dialogService.successMessage('Jogador deletado!');
        this.playersEvent.emit(players);
      }),
      catchError(LoggerService.handleError<Player[]>('deletePlayer'))
    );
  }

  groupByPosition() {
    return this.http.get(PLAYER_URL + '/groupby-position').pipe(
      tap(_ => LoggerService.log('group by position players', _)),
      catchError(LoggerService.handleError('groupByPosition', []))
    );
  }

  sortTeams(selectedPlayers: Player[]) {
    return this.http.post(PLAYER_URL + '/sort-teams', selectedPlayers, httpOptions).pipe(
      tap((players: Player[]) => LoggerService.log(`sort teams w/ id=${players ? players.toString() : ''}`, players)),
      catchError(LoggerService.handleError<Player[]>('sortTeams'))
    );
  }
}
