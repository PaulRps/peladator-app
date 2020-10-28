import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Player } from '../../shared/models/player.model';
import { environment } from '../../../environments/environment';
import { LoggerService } from '../../core/services/logger.service';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

const TEAM_URL = `${environment.apiUrl}/team`;

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(private http: HttpClient) {}

  public loadTeamsPage() {
    return this.http.get(`${TEAM_URL}/load-page`).pipe(
      tap((players: any) => LoggerService.debug(`load page w/ id=${players ? players.toString() : ''}`, players)),
      catchError(LoggerService.handleError<Player[]>('loadPage'))
    );
  }

  public sort(sortTeam: any) {
    return this.http.post(`${TEAM_URL}/sort`, sortTeam, httpOptions).pipe(
      tap((players: Player[]) => LoggerService.debug(`sort w/ id=${players ? players.toString() : ''}`, players)),
      catchError(LoggerService.handleError<Player[]>('sort'))
    );
  }
}
