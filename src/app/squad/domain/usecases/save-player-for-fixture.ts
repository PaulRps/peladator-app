import { Inject, Injectable } from '@angular/core';
import { Player } from '../models/player';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { IPlayerRepository } from '../repositories/player.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SavePlayerForFixture implements Usecase<Player, Observable<void>> {
  constructor(@Inject(IPlayerRepository.name) private readonly playerRepository: IPlayerRepository) {}

  execute(player: Player): Observable<void> {
    return this.playerRepository.savePlayerForFixture(player);
  }
}

