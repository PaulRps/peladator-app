import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { IPlayerRepository } from '../repositories/player.repository';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FilterPlayers implements Usecase<string[], Observable<Player[]>> {
  constructor(@Inject(IPlayerRepository.name) private readonly playerRepository: IPlayerRepository) {}
  execute(playerIds: string[]): Observable<Player[]> {
    return this.playerRepository.filterPlayers(environment.squadId, playerIds);
  }
}

