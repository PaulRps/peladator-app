import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Player } from '../../shared/models/player.model';
import { environment } from '../../../environments/environment';
import { LoggerService } from '../../core/services/logger.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private playerUrl = environment.apiUrl + '/player';
  public playersEvent = new EventEmitter<Player[]>();

  constructor(private http: HttpClient,
              private dialogService: DialogService) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.playerUrl)
    .pipe(
      tap(_ => LoggerService.log('fetched players', _)),
      catchError(LoggerService.handleError('getPlayers', []))
    );
  }

  getFormData(): Observable<any> {
    return this.http.get<any>(this.playerUrl + '/form-data')
    .pipe(
      tap(_ => LoggerService.log('fetched form-data', _)),
      catchError(LoggerService.handleError('getFormData', []))
    );
  }

  save(player: Player): Observable<Player[]> {
    return this.http.post<Player[]>(this.playerUrl, player, httpOptions)
    .pipe(
      tap((players: Player[]) => {
        LoggerService.log(`added player w/ id=${players ? players.toString() : ''}`, players);
        this.dialogService.successMessage('Jogador Adicionado!');
        this.playersEvent.emit(players);
      }),
      catchError(LoggerService.handleError<Player[]>('addPlayer'))
    );
  }

  update(player: Player): Observable<Player[]> {
    return this.http.put<Player[]>(this.playerUrl, player, httpOptions)
    .pipe(
      tap((players: Player[]) => {
        LoggerService.log(`update player w/ id=${players ? players.toString() : ''}`, players);
        this.dialogService.successMessage('Jogador Atualizado!');
        this.playersEvent.emit(players);
      }),
      catchError(LoggerService.handleError<Player[]>('updatePlayer'))
    );
  }

  delete(id: number): Observable<Player[]> {
    return this.http.delete<Player[]>(`${this.playerUrl}/${id}`, httpOptions)
    .pipe(
      tap((players: Player[]) => {
        LoggerService.log(`deleted player w/ id=${players ? players.toString() : ''}`, players);
        this.dialogService.successMessage('Jogador deletado!');
        this.playersEvent.emit(players);
      }),
      catchError(LoggerService.handleError<Player[]>('deletePlayer'))
    );
  }

  groupByPosition() {
    return this.http.get(this.playerUrl + '/groupby-position')
    .pipe(
      tap(_ => LoggerService.log('group by position players', _)),
      catchError(LoggerService.handleError('groupByPosition', []))
    );
  }

  sortTeams(selectedPlayers: Player[]) {
    return this.http.post(this.playerUrl + '/sort-teams', selectedPlayers, httpOptions).pipe(
      tap((players: Player[]) => LoggerService.log(`sort teams w/ id=${players ? players.toString() : ''}`, players)),
      catchError(LoggerService.handleError<Player[]>('sortTeams'))
    );
  }
}
