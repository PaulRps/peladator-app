import { Injectable } from '@angular/core';
import { IFixtureRepository } from '../../domain/repositories/fixture.repository';
import { Observable } from 'rxjs';
import { Fixture } from '../../domain/models/fixture';
import { FixtureCriteria } from '../../domain/models/fixture-criteria';
import { FixtureService } from '../services/fixture.service';

@Injectable({ providedIn: 'root' })
export class FixtureRepository implements IFixtureRepository {
  constructor(private readonly fixtureService: FixtureService) {}

  getLatest(): Observable<Fixture> {
    return this.fixtureService.getLatestFixture();
  }

  create(fixture: FixtureCriteria): Observable<Fixture> {
    return this.fixtureService.createFixture(fixture);
  }
}

