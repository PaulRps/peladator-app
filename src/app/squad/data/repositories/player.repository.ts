import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../../domain/models/player';
import { IPlayerRepository } from '../../domain/repositories/player.repository';
import { PlayerService } from '../services/player.service';

@Injectable({ providedIn: 'root' })
export class PlayerRepository implements IPlayerRepository {
  constructor(private readonly playerService: PlayerService) {}

  getAll(): Observable<Player[]> {
    return this.playerService.getPlayers();
  }

  get(id: string): Observable<Player> {
    return this.playerService.getPlayer(id);
  }

  create(player: Player): Observable<Player> {
    return this.playerService.createPlayer(player);
  }

  update(player: Player): Observable<void> {
    return this.playerService.updatePlayer(player);
  }

  delete(id: string): Observable<void> {
    return this.playerService.deletePlayer(id);
  }

  getPlayerPositions(): Observable<string[]> {
    return this.playerService.getPlayerPositions();
  }

  savePlayerForFixture(player: Player): Observable<void> {
    return this.playerService.savePlayerForFixture(player);
  }

  getPlayersForFixture(): Observable<Player[]> {
    return this.playerService.getPlayersForFixture();
  }
}



