import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { IPlayerRepository } from '../repositories/player.repository';

@Injectable({
  providedIn: 'root',
})
export class GetPlayersForFixture implements Usecase<void, Observable<Player[]>> {
  constructor(@Inject(IPlayerRepository.name) private readonly playerRepository: IPlayerRepository) {}

  execute(_: void): Observable<Player[]> {
    return this.playerRepository.getPlayersForFixture();
  }
}
