import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { PlayerId } from '../models/player';
import { IPlayerRepository } from '../repositories/player.repository';

@Injectable({
  providedIn: 'root',
})
export class DeletePlayer implements Usecase<PlayerId, Observable<void>> {
  constructor(@Inject(IPlayerRepository.name) private readonly playerRepository: IPlayerRepository) {}

  execute(id: PlayerId): Observable<void> {
    return this.playerRepository.delete(id);
  }
}

