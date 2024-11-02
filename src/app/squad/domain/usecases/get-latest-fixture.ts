import { Inject, Injectable } from '@angular/core';
import { IFixtureRepository } from '../repositories/fixture.repository';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Observable } from 'rxjs';
import { Fixture } from '../models/fixture';

@Injectable({ providedIn: 'root' })
export class GetLatestFixture implements Usecase<void, Observable<Fixture>> {
  constructor(@Inject(IFixtureRepository.name) private readonly fixtureRepository: IFixtureRepository) {}

  execute(_: void): Observable<Fixture> {
    return this.fixtureRepository.getLatest();
  }
}

