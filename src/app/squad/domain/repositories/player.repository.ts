import { Observable } from 'rxjs';
import { Player, PlayerId } from '../models/player';

export interface IPlayerRepository {
  getAll(): Observable<Player[]>;
  get(id: number): Observable<Player>;
  create(player: Player): Observable<Player>;
  update(player: Player): Observable<void>;
  delete(id: number): Observable<void>;
  getPlayerPositions(): Observable<string[]>;
}

export namespace IPlayerRepository {
  export const name = 'IPlayerRepository';
}

