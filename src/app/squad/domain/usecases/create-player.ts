import { map, Observable, tap } from 'rxjs';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Player, PlayerId } from '../models/player';
import { IPlayerRepository } from '../repositories/player.repository';
import { Inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CreatePlayer implements Usecase<Player, Observable<PlayerId>> {
  constructor(@Inject(IPlayerRepository.name) private readonly playerRepository: IPlayerRepository) {}

  execute(player: Player): Observable<PlayerId> {
    return this.playerRepository.create(player).pipe(map((player) => player.id || ''));
  }
}


