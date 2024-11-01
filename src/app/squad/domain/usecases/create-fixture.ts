import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usecase } from '../../../core/domain/usecases/usecase';
import { Fixture } from '../models/fixture';
import { FixtureCriteria } from '../models/fixture-criteria';
import { IFixtureRepository } from '../repositories/fixture.repository';

@Injectable({
  providedIn: 'root',
})
export class CreateFixture implements Usecase<FixtureCriteria, Fixture> {
  constructor(@Inject(IFixtureRepository.name) private readonly fixtureRepository: IFixtureRepository) {}

  execute(param: FixtureCriteria): Observable<Fixture> {
    return this.fixtureRepository.create(param);
  }
}

