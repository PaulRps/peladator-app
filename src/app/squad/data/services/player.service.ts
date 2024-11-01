import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Player } from '../../domain/models/player';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private readonly url = `${environment.apiUrl}/api/v1/player`;
  constructor(private readonly http: HttpClient) {}

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(`${this.url}/filter/${environment.squadId}`);
  }

  getPlayer(id: number): Observable<Player> {
    return this.http.get<Player>(`${this.url}/${id}`);
  }

  createPlayer(player: Player): Observable<Player> {
    player.squadId = environment.squadId;
    return this.http.post<Player>(`${this.url}`, player, httpOptions);
  }

  updatePlayer(player: Player): Observable<void> {
    player.squadId = environment.squadId;
    return this.http.put<void>(`${this.url}`, player, httpOptions);
  }

  deletePlayer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  getPlayerPositions(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/positions`);
  }
}

