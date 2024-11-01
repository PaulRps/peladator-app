import { Inject, Injectable } from '@angular/core';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { IPlayerRepository } from '../repositories/player.repository';

@Injectable({
  providedIn: 'root',
})
export class GetAllPlayers implements Usecase<void, Player[]> {
  constructor(@Inject(IPlayerRepository.name) private readonly playerRepository: IPlayerRepository) {}

  execute(param: void): Observable<Player[]> {
    return this.playerRepository.getAll();
  }
}

