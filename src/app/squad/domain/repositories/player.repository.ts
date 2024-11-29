import { Observable } from 'rxjs';
import { Player, PlayerId } from '../models/player';
import { PlayerWithFixtureHistory } from '../models/player-with-fixture-history';

export interface IPlayerRepository {
  filterPlayers(squadId: string, ids?: string[]): Observable<Player[]>;
  getPlayersWithHistory(squadId: string): Observable<PlayerWithFixtureHistory[]>;
  get(id: string): Observable<Player>;
  create(player: Player): Observable<Player>;
  update(player: Player): Observable<void>;
  delete(id: string): Observable<void>;
  getPlayerPositions(): Observable<string[]>;
  savePlayerForFixture(player: Player): Observable<void>;
  getPlayersForFixture(): Observable<Player[]>;
}

export namespace IPlayerRepository {
  export const name = 'IPlayerRepository';
}





