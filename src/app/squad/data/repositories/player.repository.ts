import { Injectable } from '@angular/core';
import { Player, PlayerId } from '../../domain/models/player';
import { IPlayerRepository } from '../../domain/repositories/player.repository';
import { PlayerService } from '../services/player.service';
import { Observable } from 'rxjs';

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
}



