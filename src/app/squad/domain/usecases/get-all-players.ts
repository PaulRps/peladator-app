import { Inject, Injectable } from '@angular/core';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { IPlayerRepository } from '../repositories/player.repository';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetAllPlayers implements Usecase<void, Observable<Player[]>> {
  constructor(@Inject(IPlayerRepository.name) private readonly playerRepository: IPlayerRepository) {}

  execute(_: void): Observable<Player[]> {
    const squadId = environment.squadId;
    return this.playerRepository.filterPlayers(squadId);
  }
}



