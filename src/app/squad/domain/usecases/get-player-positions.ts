import { Observable } from 'rxjs';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Inject, Injectable } from '@angular/core';
import { IPlayerRepository } from '../repositories/player.repository';

@Injectable({
  providedIn: 'root',
})
export class GetPlayerPositions implements Usecase<void, string[]> {
  constructor(@Inject(IPlayerRepository.name) private readonly playerRepository: IPlayerRepository) {}

  execute(param: void): Observable<string[]> {
    return this.playerRepository.getPlayerPositions();
  }
}

