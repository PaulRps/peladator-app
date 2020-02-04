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
    return this.http.get(`${TEAM_URL}/load-teams-page`).pipe(
      tap((players: any) => LoggerService.log(`load teams page w/ id=${players ? players.toString() : ''}`, players)),
      catchError(LoggerService.handleError<Player[]>('loadTeamsPage'))
    );
  }

  public sort(sortTeam: any) {
    return this.http.post(`${TEAM_URL}/sort-teams`, sortTeam, httpOptions).pipe(
      tap((players: Player[]) => LoggerService.log(`sort teams w/ id=${players ? players.toString() : ''}`, players)),
      catchError(LoggerService.handleError<Player[]>('sortTeams'))
    );
  }
}
