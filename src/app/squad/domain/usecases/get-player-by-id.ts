import { Inject, Injectable } from '@angular/core';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { PlayerId, Player } from '../models/player';
import { Observable } from 'rxjs';
import { IPlayerRepository } from '../repositories/player.repository';

@Injectable({
  providedIn: 'root',
})
export class GetPlayerById implements Usecase<PlayerId, Observable<Player>> {
  constructor(@Inject(IPlayerRepository.name) private readonly playerRepository: IPlayerRepository) {}

  execute(id: PlayerId): Observable<Player> {
    return this.playerRepository.get(id);
  }
}

