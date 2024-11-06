import { Inject, Injectable } from '@angular/core';
import { IFixtureRepository } from '../repositories/fixture.repository';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Fixture } from '../models/fixture';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateFixture implements Usecase<Fixture, Observable<void>> {
  constructor(@Inject(IFixtureRepository.name) private readonly fixtureRepository: IFixtureRepository) {}

  execute(fixture: Fixture): Observable<void> {
    return this.fixtureRepository.update(fixture);
  }
}

