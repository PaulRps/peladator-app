import { Inject, Injectable } from '@angular/core';
import { Player } from '../models/player';
import { IPlayerRepository } from '../repositories/player.repository';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdatePlayer implements Usecase<Player, Observable<void>> {
  constructor(@Inject(IPlayerRepository.name) private readonly playerRepository: IPlayerRepository) {}

  execute(player: Player): Observable<void> {
    return this.playerRepository.update(player);
  }
}

