import { Inject, Injectable } from '@angular/core';
import { PlayerWithFixtureAndPaymentHistory } from '../models/player-with-fixture-history';
import { Observable } from 'rxjs';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { IPlayerRepository } from '../repositories/player.repository';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetPlayersWithFixtureHistory implements Usecase<void, Observable<PlayerWithFixtureAndPaymentHistory[]>> {
  constructor(@Inject(IPlayerRepository.name) private readonly playerRepository: IPlayerRepository) {}

  execute(_: void): Observable<PlayerWithFixtureAndPaymentHistory[]> {
    return this.playerRepository.getPlayersWithHistory(environment.squadId);
  }
}


